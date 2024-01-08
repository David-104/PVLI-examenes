export default class Menu extends Phaser.Scene{
    constructor(){
        super({key : 'menu'})
    }

    create(){
        this.music  = this.sound.add('menuMusic', { loop: true })
        this.music.play();
        
        this.stars = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY -150, 'stars');
        this.stars.setScale(4, 4);

        this.text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY -150, 'CIRCUS', { 
            fontFamily: 'arcade_classic', 
            fontSize: 50, 
            color: 'White' 
        })
        this.text.setOrigin(0.5, 0.5)


        //easy
        this.eButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 50, 'EASY', { 
            fontFamily: 'arcade_classic', 
            fontSize: 40, 
            color: 'White' 
        })
        this.eButton.setOrigin(0.5, 0.5)
        this.eButton.setInteractive();
        this.eButton.on('pointerdown',() => {
            this.startGame(50)
        })

        //normal
        this.nButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 150, 'NORMAL', { 
            fontFamily: 'arcade_classic', 
            fontSize: 40, 
            color: 'White' 
        })
        this.nButton.setOrigin(0.5, 0.5)
        this.nButton.setInteractive();
        this.nButton.on('pointerdown',() => {
            this.startGame(100)
        })

        //hard
        this.hButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 250, 'HARD', { 
            fontFamily: 'arcade_classic', 
            fontSize: 40, 
            color: 'White' 
        })
        this.hButton.setOrigin(0.5, 0.5)
        this.hButton.setInteractive();
        this.hButton.on('pointerdown',() => {
            this.startGame(200)
        })

        //extremo
        this.exButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 350, 'EXTREME', { 
            fontFamily: 'arcade_classic', 
            fontSize: 40, 
            color: 'White' 
        })
        this.exButton.setOrigin(0.5, 0.5)
        this.exButton.setInteractive();
        this.exButton.on('pointerdown',() => {
            this.startGame(20)
        })
    }

    startGame(distance){
        this.music.pause();
        this.scene.start('level', distance)
    }
}