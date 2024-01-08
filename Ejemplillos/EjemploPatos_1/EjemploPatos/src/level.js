import Duck from './duck.js';
import BirdWithHat from './birdWithHat.js';
import Hat from './hat.js';

/**
 * Nuestra primera escena, con patos, pájaros, sombreros y explosiones...
 * Menudo mierdón es phaser lo siento mucho por haceros programar aquí :P <- Un tal Pablo escribió esto, e igual suspende JuegosSerios
 * En verdad Phaser es la hostia y sencillo de usar :)
 * "The cake is a lie"
 */
export default class Level extends Phaser.Scene {
	/**
	 * Constructor, deficimos la key que tendrá la escena, nos sirve para los cambios de escena 
	 */
	constructor(){	
		super({ key: 'level' });
	}

	init(){

	}

	/**
	 * Cargamos los assets que vamos a necesitar!!
	 */
	preload(){
		this.load.image('world', 'assets/duckWorld.jpg');
		this.load.spritesheet('duck', 'assets/duck.png', {frameWidth: 48, frameHeight: 48})
		this.load.spritesheet('duck2', 'assets/duck2.png', {frameWidth: 48, frameHeight: 48})
		this.load.spritesheet('bird', 'assets/bird.png', {frameWidth: 32, frameHeight: 32})
		this.load.spritesheet('bird2', 'assets/bird2.png', {frameWidth: 32, frameHeight: 32})
		this.load.spritesheet('hat', 'assets/hats.png', {frameWidth: 16, frameHeight: 16})
		this.load.spritesheet('explosion', 'assets/explosion.png', {frameWidth: 16, frameHeight: 16})
	}

	create(){
		this.add.image(0, 0, 'world').setScale(0.8, 0.8).setOrigin(0, 0) // el fondo

		// Ahora nuestro pájaros con sombrerooooooo
		new BirdWithHat(this, 100, 50, 'bird2', new Hat(this, 0), 11, -22);
		new BirdWithHat(this, 300, 250, 'bird2', new Hat(this, 2), 11, -22);

		new BirdWithHat(this, 200, 400, 'bird', new Hat(this, 1), 11, -10);
		new BirdWithHat(this, 400, 500, 'bird', new Hat(this, 3), 11, -10);

		// Un par de patos que movemos con teclado
		new Duck(this, 500, 450)
		new Duck(this, 50, 600)
		
		// Y escuchamos la pulsación de la tecla 'O' para cambiar de escena.
		this.nextKey = this.input.keyboard.addKey('O'); 

		// IMPORTANTEEEEEE --> Hay muchísimas maneras de usar los inputs
		// https://rexrainbow.github.io/phaser3-rex-notes/docs/site/keyboardevents/

		// podríamos hacer: 
		// keyObj.on('down', (event) => { this.scene.start("level2"); });
		
	}

	update(){
		if(this.nextKey.isDown){ // Comprobamos si hemos pulsado la tecla 'O', en cuyo caso, pasamos a esa escena.
			this.scene.start("level2", {datos:"the cake is a lie"}); // Pasamos a la escena con identificador 'level2' , como segundo parámetro podemos mandar info a la otra escena
			// --> (Mirad la documentación, hay otras funciones como launch, pause, sleep...)
		}

	}
}