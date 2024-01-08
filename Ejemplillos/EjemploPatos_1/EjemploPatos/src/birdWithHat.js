/**
 * Clase que representa un pájaro que puede tener un sombrero
 * Es un contenedor que tiene el pájaro {Sprite} y el sombrero {Hat} que extiende {Sprite}
 */
export default class BirdWithHat extends Phaser.GameObjects.Container {
	/**
	 * Constructor del pájaro con sombrero.
	 * 
	 * @param {Scene} scene - escena en la que aparecerá el pájaro
	 * @param {number} x - posición X
	 * @param {number} y - posicion Y
	 * @param {String} key - identificador del sprite que se usará (nos permite tener diferentes apariencias para el pájaro)
	 * @param {Hat} hat - sombrero que llevará el pájaro, puede ser null/undefined y no llevar sombrero
	 * @param {number} xHat - coordenada x del sombrero respecto al pájaro
	 * @param {number} yHat - coordenada y del sombrero respecto al pájaro
	 */
	constructor(scene, x, y, key, hat, xHat, yHat){
		super(scene, x, y); //llamamos a la contrsuctora padre, la constructora de Container

		this.dir = 1; //dirección de movimiento de nuestro pájaro con sombrero


		// Creamos el pájaro {Sprite} y lo añadimos al contenedor (this)
		this.bird = new Phaser.GameObjects.Sprite(scene, 0, 0, key, 0); 
		this.bird.setScale(2,2);
		this.add(this.bird);

		// Añadimos el sombrero {Hat} al contenedor (this) si tenemos sombrero 
		if(hat){
			this.hat = hat;
			this.add(this.hat);
			this.hat.x = xHat;
			this.hat.y = yHat;
		} else {
			this.hat = null;
		}

		// Añadimos el contenedor, el pájaro con sombrero, this, a la escena
		this.scene.add.existing(this);

		// Creamos las animaciones de andar
		// IMPORTANTE: Esto no debería hacerse aquí, ya que estamos creando la animación con cada instancia, pero las animaciones son gestionadas de manera global.
		this.scene.anims.create({
			key: 'walkL'+key,
			frames: scene.anims.generateFrameNumbers(key, {start:12, end:14}),
			frameRate: 5,
			repeat: -1
		});

		this.scene.anims.create({
			key: 'walkR'+key,
			frames: scene.anims.generateFrameNumbers(key, {start:24, end:26}),
			frameRate: 5,
			repeat: -1
		});

		// Ejecutamos la animación de andar hacia la derecha ('walkRduck' o 'walkRbird' según el identificador key)
		this.key = key;
		this.bird.play('walkR'+key)
	}

	preUpdate(t, dt){
		this.bird.preUpdate(t, dt); // IMPORTANTE llamar al preUpdate del Sprite para que se ejecute su animación
		

		// Comprobamos si salimos del Canvas para cambiar de dirección
		if(this.x>this.scene.sys.game.canvas.width || this.x < 0){
			this.dir*=-1;
			
			if(this.hat){
				this.hat.x *=-1;
			}

			if( this.dir == -1 ){
				this.bird.play('walkL'+this.key)
			} else if( this.dir == 1 ) {
				this.bird.play('walkR'+this.key)
			}
		}
		
		// Tenemos que tener en cuenta dt para que independientemente de los frames por segundo nuestra velocidad sea siempre la misma.
		this.x += (dt/20)*this.dir
	}

}