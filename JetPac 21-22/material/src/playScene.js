import Player from "./player.js";
import Fuel from "./fuel.js";

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

        this.load.image('fuel', './assets/sprites/fuel.png')
    }

    create(){
        const map = this.make.tilemap({
            key: "tilemap",
            tileWidth: 8,
            tileHeight: 8
        })

        const tileset = map.addTilesetImage("suelo","tileset");  //nombre del tileset dentro del json y key del tileset aqui

        this.groundLayer = map.createLayer('ground', tileset); 
        this.groundLayer.setCollisionByProperty({ collides: true }); //las properties en los tiles individuales

        this.player = new Player(this, 128, 0, 'jetpac') //player

        this.physics.add.collider(this.player, this.groundLayer); //colisiones player/suelo

        this.fuel = new Fuel(this, 100, 0, 'fuel') //cambiar a una pool
        this.physics.add.collider(this.fuel, this.groundLayer);

        this.loadAnims();
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
    }

    update(){
        
    }
}