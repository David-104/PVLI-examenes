export default class Boot extends Phaser.Scene{

    constructor(){
        super({key: 'Boot'});
    }

    preload(){

        // Cargamos Spritesheets
        this.load.spritesheet('penguin', 'assets/penguin40.png', {frameWidth: 40, frameHeight: 40});
        this.load.spritesheet('rat', 'assets/rat32.png', {frameWidth: 32, frameHeight: 32});

        // Cargamos Imagenes
        this.load.image('ball', './assets/ball16.png');
        this.load.image('background', './assets/background.png')
        this.load.image('table', './assets/table.png')
        this.load.image('score', './assets/score.png')

        // Cargamos Audio
        //this.load.audio('drop', './assets/sounds/drop.wav');
    }

    loadAnimations(){
        // Creamos Animaciones
        this.anims.create({
            key: 'penguinIdle',
            frames: this.anims.generateFrameNumbers('penguin', {start:0, end:0}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'penguinIdleBall',
            frames: this.anims.generateFrameNumbers('penguin', {start:5, end:5}),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'penguinMove',
            frames: this.anims.generateFrameNumbers('penguin', {start:1, end:2}),
            frameRate: 5,
            repeat: -1
        })
    }

    create()
    {
        this.loadAnimations();
        this.scene.start("Menu");

    }

    update(){
        
    }
}
