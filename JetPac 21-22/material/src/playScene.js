import Player from "./player.js";
import Fuel from "./fuel.js";
import Spaceship from "./spaceship.js";
import Meteor from "./meteor.js";

export default class PlayScene extends Phaser.Scene {
    constructor(){
        super({key: 'play'});
    }

    init(params){
        //console.log(params) //para pasar parametros de una escena a otra se meten en un objeto
        this.fuelNum = params.fuelNum;
        this.spawnTime = params.spawnTime;
    }

    preload(){
        this.load.tilemapTiledJSON('tilemap', './assets/map/tilemap.json'); //carga tilemap
        this.load.image('tileset', './assets/sprites/tileset.png'); //carga atlas de patrones

        this.load.spritesheet('jetpac', './assets/sprites/jetpac.png', { frameWidth: 17, frameHeight: 24 }); //spritesheet player
        this.load.spritesheet('meteor', './assets/sprites/meteor.png', {frameWidth: 16, frameHeight: 14});
        this.load.spritesheet('explosion', './assets/sprites/explosion.png', {frameWidth: 24, frameHeight: 17});

        this.load.image('fuel', './assets/sprites/fuel.png')
        this.load.image('spaceship', './assets/sprites/spaceship.png')

        this.load.audio('drop', './assets/sounds/drop.wav');
        this.load.audio('explosion', './assets/sounds/explosion.wav');
        this.load.audio('lose', './assets/sounds/lose.wav');
        this.load.audio('pick', './assets/sounds/pick.wav');
        this.load.audio('win', './assets/sounds/win.wav');
        
    }

    create(){

        this.fuelPool = [];
        this.meteorPool = [];
        this.currentFuel = 0;
        this.endGame = false;


        const map = this.make.tilemap({
            key: "tilemap",
            tileWidth: 8,
            tileHeight: 8
        })

        const tileset = map.addTilesetImage("suelo","tileset");  //nombre del tileset dentro del json y key del tileset aqui

        this.groundLayer = map.createLayer('ground', tileset); 
        this.groundLayer.setCollisionByProperty({ collides: true }); //las properties en los tiles individuales

        this.player = new Player(this, 128, 0, 'jetpac') //player
        this.spaceship = new Spaceship(this, 200, 159, 'spaceship') //nave

        this.physics.add.overlap(this.player, this.spaceship); //colisiones player/suelo
        this.physics.add.collider(this.player, this.groundLayer); //colisiones player/suelo

        this.loadAnims();
        
        this.loadSounds();

        this.createUI();

        this.newFuel();
        
        this.spawnMeteor();

        this.victoryAnim = this.tweens.add ({
            targets: this.spaceship, //objeto al que se aplica el tween
			duration: 2000, //tiempo entre que se mueve de un sitio a otro
		    y: -100, //por ejemplo, para salir de la pantalla, son coordenadas en el mundo
            paused: true, //no se ejecuta al inicio
        })
    }

    loadAnims(){
        this.anims.create({
            key: 'walkingPlayer',
            frames: this.anims.generateFrameNumbers('jetpac', {start:5, end:7}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'flyingPlayer',
            frames: this.anims.generateFrameNumbers('jetpac', {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'idlePlayer',
            frames: this.anims.generateFrameNumbers('jetpac', {start:4, end:4}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'meteorFall',
            frames: this.anims.generateFrameNumbers('meteor', {start:0, end:1}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'meteorExp',
            frames: this.anims.generateFrameNumbers('explosion', {start:0, end:2}),
            frameRate: 5,
            repeat: -1
        });
    }

    loadSounds(){
        this.dropS = this.sound.add('drop', {loop: false})
        this.pickS = this.sound.add('pick', {loop: false})
        this.loseS = this.sound.add('lose', {loop: false})
        this.winS = this.sound.add('win', {loop: false})
    }

    update(){
        this.collisions();
        this.updateUI();
        if(this.currentFuel >= this.fuelNum)
        {
            this.player.destroy();
            this.victoryAnim.play();
            this.winS.play();
            this.time.delayedCall(2000, () => {  
                this.scene.start('mainMenu');
            }, [], this);
        }
        if(this.player.isDead)
        {
            this.loseS.play();
            if(this.player.carryingFuel)
                this.player.auxFuel.destroy();
            this.player.destroy();
            this.time.delayedCall(2000, () => {  
                this.scene.start('mainMenu');
            }, [], this);
        }
    }

    newFuel(){
        let fuel = new Fuel(this, Phaser.Math.Between(0, this.cameras.main.width), Phaser.Math.Between(0, this.cameras.main.height), 'fuel') 
        this.fuelPool.push(fuel);
        this.physics.add.collider(fuel, this.groundLayer);
    }

    pickUpFuel(){
        this.pickS.play();
        this.player.carryFuel();
    }

    deliverFuel(){
        this.dropS.play();
        this.currentFuel++;
        this.player.auxFuel.destroy();
        this.player.carryingFuel = false;
        if(this.currentFuel < this.fuelNum)
            this.newFuel();
    }

    collisions(){
        this.fuelPool.forEach(fuel => {
            fuel.pickUpCollision();
        })

        this.meteorPool.forEach(meteor => {
            meteor.collisions();
        })

        this.spaceship.playerCollision();

    }

    createUI(){
        this.hud = this.add.text(this.spaceship.x, this.spaceship.y - 35, "");
        this.hud.setOrigin(0.5, 0.5) //origen del texto
        this.hud.setFont('Pixeled') //nombre fuente en el css
        this.hud.setFontSize(12) //tamaño
        
        this.hud.setStroke('#000000', 6) //reborde
        this.hud.setFill('#ffffff'); //color
    }
    updateUI(){
        let text = this.currentFuel + "/" + this.fuelNum;
        this.hud.text = text;
    }

    spawnMeteor(){
        const newMet = () => {
            let meteor = new Meteor(this, Phaser.Math.Between(0, this.cameras.main.width), -20 , 'meteor', Phaser.Math.Between(-50, 50))
            this.physics.add.collider(meteor, this.groundLayer)
            this.meteorPool.push(meteor);
        }
        
        this.time.addEvent({
            delay: (this.spawnTime * 1000),
            loop: true,
            callback: newMet,
            callbackScope: this
        });
    }
}


/*
 * Clase que representa el suelo, es de tipo Sprite pero no tiene una imagen asociada
 * Tendra un collider para que los personajes no caigan por debajo
 
export default class Floor extends Phaser.GameObjects.Sprite {

    constructor(scene, y, width) {
      super(scene, 0, scene.sys.game.canvas.height-y);
  
      this.scene.add.existing(this);
      //el segundo true es para que sea estático
      //al ser estático no le afecta la gravedad
      this.scene.physics.add.existing(this, true);
  
      this.scene.physics.add.collider(this);
  
      // Cambiamos el tamaño del body para ocupar todo el ancho de la escena
      this.body.width = width;
      this.body.height = 20;
    }
  }
*/