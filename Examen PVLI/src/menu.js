export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    create() {

        let title = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 50,
            'Penguin-chan wars',
            {
                fontFamily: 'babelgam',
                fontSize: 60,
                color: 'White',
            }
        ).setOrigin(0.5, 0.5);

        // "Botones"
       // this.createButton('1 player', 0, 2, 2, 'white');
        this.createButton('2 player', 10, 'white');

        this.w = this.input.keyboard.addKey('W');
        this.a = this.input.keyboard.addKey('A');
        this.space = this.input.keyboard.addKey('Space');

        this.twoPlayer = false;
    }

    createButton(text, yOffset, textColor) {
        let button = this.add.text(
            this.cameras.main.centerX,
            yOffset + this.cameras.main.centerY,
            text,
            {
                fontFamily: 'babelgam',
                fontSize: 50,
                color: textColor
            }
        ).setOrigin(0.5, 0.5);
    }

    update() {
        if(this.space.isDown){
            this.scene.start('play', this.twoPlayer)
        }
    }
}