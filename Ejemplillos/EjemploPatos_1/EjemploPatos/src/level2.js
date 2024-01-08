import Hat from './hat.js';
import BouncingDuck from './bouncingDuck.js';

/**
 * Clase para la escena del nivel 2
 */
export default class Level2 extends Phaser.Scene {
	constructor(){	
		super({ key: 'level2' });
	}

	/**
	 * función init, recibimos la información desde la escena que la llama
	 */
	init(data){
		console.log(data)
	}

	preload(){
		/**
		 * Los siguientes load son totalmente innecesarios, los assets están cargados desde la escena anterior y no los hemos descargado en ningún momento. Probad a borrarlo, todo seguirá funcionando
		 */
		this.load.image('world', 'assets/duckWorld.jpg');
		this.load.spritesheet('duck', 'assets/duck.png', {frameWidth: 48, frameHeight: 48})
		this.load.spritesheet('duck2', 'assets/duck2.png', {frameWidth: 48, frameHeight: 48})
		this.load.spritesheet('bird', 'assets/bird.png', {frameWidth: 32, frameHeight: 32})
		this.load.spritesheet('bird2', 'assets/bird2.png', {frameWidth: 32, frameHeight: 32})
		this.load.spritesheet('hat', 'assets/hats.png', {frameWidth: 16, frameHeight: 16})
		this.load.spritesheet('explosion', 'assets/explosion.png', {frameWidth: 16, frameHeight: 16})
	}

	create(){

		// Creamos un grupo para meter todos los patos y poder decir después que estos colisionan entre ellos.
		this.ducks = this.add.group();

		this.duck1 = new BouncingDuck(this, 100, 450)
		this.duck2 = new BouncingDuck(this, 200, 450, new Hat(this, 1))
		this.duck3 = new BouncingDuck(this, 500, 450)

		// Metemos los patos que hemos creado en el grupo de patos
		this.ducks.add(this.duck1)
		this.ducks.addMultiple([this.duck2, this.duck3])

		// los patos colisionan entre sí, si Phaser detecta la colisión llamará a la función que pasamos como tercer parámetros
		this.physics.add.collider(this.ducks, this.ducks, callback); 

		// También podríamos hacerlo con una función arrow:
		// this.physics.add.collider(this.ducks, this.ducks, (event) => {console.log("colision")} ); 

		// Añadimos un texto en medio de la pantalla preguntandole al juego por el tamaño del canvas
		this.add.text(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, "Oscuridad!\n y algo de patos", 
			{fontFamily: 'comicate', fontSize: 32, color: '#FFFF00'}).setOrigin(0.5,0.5);	

		// Añadimos un texto con información de dónde está el ratón en todo momento, actualizaremos esta info en el update() de la escena
		this.pointerText = this.add.text(50, 50, "", 
			{fontFamily: 'comicate', fontSize: 16, color: '#FF0000'}).setOrigin(0,0.5);	
		
		// Vamos a hacer que la cámara rote si pulsamos las teclas 'R' o 'L'
		this.rotateRKey = this.input.keyboard.addKey('R'); 
        this.rotateRKey.on('down', function (event)
        {

            this.cameras.main.setRotation(this.cameras.main.rotation - 0.01);

        }, this);

        this.rotateLKey = this.input.keyboard.addKey('L'); 
        this.rotateLKey.on('down', function (event)
        {

            this.cameras.main.setRotation(this.cameras.main.rotation + 0.01);

        }, this);


		// Registramos también el input del puntero para escuchar el evento de pulsar el botón izq
		this.pointer = this.input.activePointer;
		this.input.on('pointerdown',  function (pointer) {
    		this.input.mouse.requestPointerLock(); // secuestramos el puntero O.o, muy útil si el juego no lo necesita, para que no moleste
		}, this);

        this.input.on('pointerdown', function (pointer)
        {
            if (this.sys.game.scale.isFullscreen) // Preguntamso a Phaser si estamos en pantalla completa
            {
                this.scale.stopFullscreen()  // quitamos la pantalla completa
            }
            else
            {
                this.scale.startFullscreen() // cambiamos a pantalla completa
            }
        }, this);
			
	}

	/**
	 * Función update de la escena, se llama en cada tick del juego.
	 */
	update(){
		// Actualizamos la info de la posición del ratón
		this.pointerText.setText("X: "+Math.round(this.pointer.worldX)+"/ Y: "+Math.round(this.pointer.worldY) + " Click?: "+this.pointer.isDown);

		// Podemos comprobar si hay colisión de patos 'manualmente' en vez de registrarnos al evento
		/*
		if(this.physics.collide(this.ducks, this.ducks)) {
			console.log("Hay colisión de patos");
		}*/
	}

	callback(){
		console.log("callback")
	}
}