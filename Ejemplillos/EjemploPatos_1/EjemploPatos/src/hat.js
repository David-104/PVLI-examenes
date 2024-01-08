/**
 * Clase que representa el sombrero de los pájaros
 * @extends Spite
 */
export default class Hat extends Phaser.GameObjects.Sprite {
	/**
	 * Contructor del sombrero
	 * @param {Scene} scene, escena en la que se añade el sombrero
	 * @param {number} hatId, identificador para la apariencia del sombrero, corresponde al frame del Spritesheet
	 */
	constructor(scene, hatId){
		// Llamamos al constructor del padre {Sprite}
		super(scene, 0, 0, 'hat', hatId);

		// Añadimos el sombrero a la escena y lo hacemos interactivo (podremos comprobar si se ha pulsado sobre el sombrero)
		this.scene.add.existing(this);
		this.setInteractive();

		// Escuchamos el evento 'pointerdown'. El sombrero será interactivo, por lo que podremos saber si se pulsa en él y hacer lo que sea necesario
		// El segundo parámetro de la función "on()" tenemos que pasar la función que queramos ejecutar si pasa el evento (es un callback). En este caso definimos una función anónima arrow que ejecutará la función "explode()"
		// Para estas cosas mirad la documentación, por ejemplo del evento "pointerdown" https://newdocs.phaser.io/docs/3.54.0/Phaser.Input.Events.POINTER_DOWN  (se ve que lleva asociado ese objeto pointer con las coordenadas de la pulsación)
		this.on('pointerdown', (pointer) => {
	    	this.explode(pointer);
	    });

		// Escuchamos el evento de cuando termina una animación "animationcomplete"
		this.on('animationcomplete', (animation) => {
			if (animation.key === 'explosion'){ // compruebo si la animación del evento "explosion"
				this.destroyMe = true;
			}

			// también podría comprobar si la animación actual, que ha lanzado el evento es "explosion" con:
			// if( this.anims.currentAnim.key === 'explosion' )
		})

		// Creamos la animación de explotar
		/*
			IMPORTANTE, esta animación es algo de la escena, realmente no debería estar aquí. 
			Cada vez que "instanciamos" un sombrero, estamos volviendo a crear la animación
			Lo más normal es crear todas las animaciones necesarias en una
			escena que se encargue también de cargar los recursos (imagenes, sprites, sonidos, ect.)
		*/
		this.scene.anims.create({
			key: 'explosion',
			frames: scene.anims.generateFrameNumbers('explosion', {start:0, end:2}),
			frameRate: 10,
      		repeat: 0
		});
		// Fin creación de la animación
	}

	/**
	 * preUpdate del sombrero
	 * @param {number} t 
	 * @param {number} dt 
	 */
	preUpdate(t, dt){
		super.preUpdate(t, dt) // IMPORTANTE llamar al super.preUpdate del padre cuando somos sprites. Si no se llama, no habrá animación!!!!!!!!!!!!!

		// Destruimos el objeto 
		if(this.destroyMe){
			this.destroy();
		}
	}

	/**
	 * Acción de explotar
	 * @param {Pointer} pointer 
	 */
	explode(pointer){
		this.play('explosion'); // lanzamos la animación con id "explosion"
		console.log("Estoy explotandooooo porque se ha pulsado en la coordenada:", pointer.x," ", pointer.y)
	}

}