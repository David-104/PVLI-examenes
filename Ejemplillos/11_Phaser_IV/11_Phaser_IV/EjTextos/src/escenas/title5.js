/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
export default class Title5 extends Phaser.Scene {
	/**
	 * Escena de texto cargado con archivos TTF locales.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'title5' });
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
		this.load.image('castle', 'assets/castle.gif');
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		this.add.image(0, 0, 'castle').setOrigin(0, 0);
			
        this.textButton(this.cameras.main.centerX, 70, '1.-Browser Text Example', 'title');
		this.textButton(this.cameras.main.centerX, 140, '2.-BitMaps Example', 'title2');
		this.textButton(this.cameras.main.centerX, 210, '3.-GoogleFont Example', 'title3');
		this.textButton(this.cameras.main.centerX, 280, '4.-Local TTF Example', 'title4');
		this.textButton(this.cameras.main.centerX, 350, '5.-2º Local TTF Example', 'title5', true);
	}

	textButton(x, y, message, sceneKey, selected=false){
        let text = this.add.text(x, y, message, {fontFamily: 'comicate', fontSize: 32, color: '#FFFF00'})	
        text.setOrigin(0.5,0.5);

		//Color el color y la sombra del texto si estamos en la escena con ese tipo de texto.
        if(selected){
        	text.setColor('#0000FF')
        	text.setShadow(10, 10, "#999999", 1, false, true);
        }     

        text.setInteractive();
		text.on('pointerdown', ()=>{
			this.scene.start(sceneKey)
		})
	}

}