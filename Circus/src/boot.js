export default class Boot extends Phaser.Scene{
    constructor(){
        super({key : 'boot'})
    }

    preload(){
        // Cargamos Spritesheets
        this.load.spritesheet('clown', './assets/sprites/clown.png', {frameWidth: 16, frameHeight: 24});
        this.load.spritesheet('lion', './assets/sprites/lion.png', {frameWidth: 36, frameHeight: 16});
        this.load.spritesheet('ring', './assets/sprites/ring.png', {frameWidth: 26, frameHeight: 80});
        this.load.spritesheet('fire', './assets/sprites/fire.png', {frameWidth: 25, frameHeight: 31});
        
        // Cargamos Imagenes
        this.load.image('background', './assets/sprites/background.png');
        this.load.image('stars', './assets/sprites/stars.png');
        this.load.image('platform', './assets/sprites/platform.png');
        
        // Cargamos Audio
        this.load.audio('menuMusic', './assets/sounds/menu.mp3');
        this.load.audio('scoreSound', './assets/sounds/score.wav');
        this.load.audio('stageMusic', './assets/sounds/stage.mp3');
        this.load.audio('failureSound', './assets/sounds/failure.mp3');
        this.load.audio('finalSound', './assets/sounds/final.wav');
        this.load.audio('jumpSound', './assets/sounds/jump.wav');
    }

    create(){
        this.loadAnims();
        this.scene.start("menu");
    }

    loadAnims(){
        this.anims.create({
            key: 'lionWalk',
            frames: this.anims.generateFrameNumbers('lion', {start:1, end:2}),
            frameRate: 3,
            repeat: -1
        })
        this.anims.create({
            key: 'lionJump',
            frames: this.anims.generateFrameNumbers('lion', {start:0, end:0}),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'lionDead',
            frames: this.anims.generateFrameNumbers('lion', {start:3, end:3}),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'lionIdle',
            frames: this.anims.generateFrameNumbers('lion', {start: 2, end: 2}),
            frameRate: 5,
            repeat: -1
        })


        this.anims.create({
            key: 'clownWalk',
            frames: this.anims.generateFrameNumbers('clown', {start:0, end:0}),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'clownJump',
            frames: this.anims.generateFrameNumbers('clown', {start:1, end:1}),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'clownVictory',
            frames: this.anims.generateFrameNumbers('clown', {start:2, end:3}),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'clownDead',
            frames: this.anims.generateFrameNumbers('clown', {start:4, end:4}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'ringAnim',
            frames: this.anims.generateFrameNumbers('ring', {start:0, end:1}),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'fireAnim',
            frames: this.anims.generateFrameNumbers('fire', {start:0, end:1}),
            frameRate: 5,
            repeat: -1
        })
    }
}