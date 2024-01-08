import Floor from "./floor.js";
import Player from "./player.js";
import Ring from "./ring.js";

export default class Level extends Phaser.Scene{
    constructor(){
        super({key : 'level'})
    }

    init(params){
        this.distance = params;
    }

    create(){
        this.endGame = false;
        // Cargamos la Música
        this.music = this.sound.add('stageMusic', { loop: true, volume: 0.5 });
        this.music.play();
        // Cargamos el sonido de fallo
        this.failureSound = this.sound.add('failureSound', { loop: false, volume: 0.5 });
        //sonido final
        this.endSound = this.sound.add('finalSound',  { loop: true, volume: 0.5 })

        //fondos
        this.fondos = []
        for (var i = 0; i < 3; i++){
            let background = this.add.image(i * 800, 170, "background").setOrigin(0, 0);
            this.fondos.push(background);
        }
        console.log(this.fondos)
        
        //carteles
        for(var i = 0; i < this.distance / 10; i++){
            this.addCartel(i * 800 + 200, 700, this.distance - i * 10)
        }

        //player
        this.player = new Player(this, 100, 500);

        //floor
        this.floor = new Floor(this, 600, this.distance / 10 * 800)

        this.physics.add.collider(this.player, this.floor); //colisiones player/suelo

        this.camera = this.cameras.main.startFollow(this.player, true, 0.1, 0, -250, 150);
        //this.camera.setFollowOffset(-300, 200);

        this.spawnObstacle();
    }

    update(){
        this.checkBg();
        //this.cameras.main.x = -this.player.x

    }

    addCartel(x, y, meters){
        let outline = this.add.rectangle(x, y, 110, 60, '0xff0000')
        outline.setDepth(1)
        let box = this.add.rectangle(x, y, 100, 50, '0x000000')
        box.setDepth(2)
        let text = this.add.text(box.x, box.y, meters + " M", { 
            fontFamily: 'arcade_classic', 
            fontSize: 15, 
            color: 'White' 
        })
        text.setOrigin(0.5, 0.5);
        text.setDepth(3);
    }

    checkBg(){
        for(var i = 0; i < this.fondos.length; i++){
            if(this.fondos[i].x + this.fondos[i].width < this.cameras.main.scrollX){
                let newBg = this.add.image(this.fondos[i].x + 3 * this.fondos[i].width, 170, "background").setOrigin(0, 0).setDepth(0);
                this.fondos[i].destroy();
                this.fondos[i] = newBg;
            }
        }
    }

    spawnObstacle(){
        if(!this.endGame && this.player.x < this.floor.width - 1000){
            const createRing = () => {
                let ring = new Ring(this, this.player.x + 800, 500);
                this.physics.add.collider(this.player, ring, this.playerDie, null, this)
            }

            this.time.addEvent({
                delay: 5000,
                loop: true,
                callback: createRing,
                callbackScope: this
            });
        }
    }

    playerDie(){
        this.endGame = true;
        this.music.pause();
        this.failureSound.play();
        this.player.anims.play('clownDead')
        this.player.lion.anims.play('lionDead')

        this.time.delayedCall(3500, () => {
            this.backToMenu();
        }, [], this); 
    }

    backToMenu(){
        this.scene.start('menu');
    }
}