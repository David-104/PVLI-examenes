import DialogText from "./dialog_plugin.js";

export default class BaseScene extends Phaser.Scene {
	/**
	 * Escena de texto cargado con archivos TTF locales.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'base' });
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
		this.load.image('sky', 'assets/space.png');
        this.load.image('logo', 'assets/phaser3-logo.png');
        this.load.image('red', 'assets/red.png');


	}
	
	create() {
		this.add.image(0, 0, 'sky').setOrigin(0, 0);

        this.add.image(400, 100, 'logo');

		this.dialog = new DialogText(this, {
			borderThickness: 4,
			borderColor: 0xcb3234,
			borderAlpha: 1,
			windowAlpha: 0.6,
			windowColor: 0xff6961,
			windowHeight: 150,
			padding: 32,
			closeBtnColor: 'darkgoldenrod',
			dialogSpeed: 3,
			fontSize: 24,
			fontFamily: "pixel"
		});

		//this.dialog.toggleWindow();
		this.dialog.setText("Bu! Vamos a hacer un jueguito", true);
	}

}
