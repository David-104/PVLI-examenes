import BirdWithHat from './birdWithHat.js';

/**
 * Clase pato, extiende {BirdWithHat}, es un pájaro con sombrero que realmente no tiene sombrero (hat=null)
 * No tiene mucho sentido, pero queria jugar con los contenedores y la herencia a la vez que tenia patos y sombreros, y explosiones...
 */
export default class Duck extends BirdWithHat {
	/**
	 * Constructor del pato
	 * @param {Scene} scene -  escena
	 * @param {number} x - posición X en la escena
	 * @param {number} y - posición Y en la escena
	 */
	constructor(scene, x, y){
		// Llamamos al constructor del padre, este realmente puede recibir 7 parámetros (scene, x, y, key, hat, xHat, yHat), pero como esto es JS lo que no pasemos será undefined... y de lo que pasamos de más, no se hará nada
		// The cake is a lie
		super(scene, x, y, 'duck');

		// Creamos las animaciones
		// Como ya he mencionado en otros scipts, esto mejor hacerlo desde una escena
		// Aunque Phaser también nos permite crear animaciones locales a un Sprite, más info en la documentación (https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Sprite.html)
		this.scene.anims.create({
			key: 'walkDuck',
			frames: scene.anims.generateFrameNumbers('duck', {start:24, end:26}),
			frameRate: 5,
			repeat: -1
		});

		this.scene.anims.create({
			key: 'idleDuck',
			frames: scene.anims.generateFrameNumbers('duck', {start:0, end:3}),
			frameRate: 5,
			repeat: -1
		});


		// Ejecutamos la animación 'idleDuck'
		this.bird.play('idleDuck')

		// Registramos las teclas de input  A y D
		this.aKey = this.scene.input.keyboard.addKey('A'); //izquierda
		this.dKey = this.scene.input.keyboard.addKey('D'); //derecha
	}

	/**
	 * Sobrescribimos el preUpdate del padre, se ejecutará esté en vez el preUpdate de la clase padre {BirdWithHat}
	 * @param {number} t 
	 * @param {number} dt 
	 */
	preUpdate(t, dt){
		this.bird.preUpdate(t, dt); // preUpdate del pájaro, como no hay nada privamos, podemos acceder a los parámetros de la clase padre que hemos extendido

		// Comprobamos si se está pulsando la tecla 'A'
		if(this.aKey.isDown){ 
			this.x += (dt/20)*2*-this.dir;
			this.bird.setFlip(true, false);
			this.bird.play('walkDuck', true)
		} 
		// Comprobamos si se está pulsando la tecla 'D'
		else if(this.dKey.isDown){
			this.x += (dt/20)*2*this.dir;
			this.bird.setFlip(false, false);
			this.bird.play('walkDuck', true)
		} 

		//---> Con Phaser.Input.Keyboard.JustDown(this.dKey) podemos comprobar una única pulsación, devolvera una sola vez true aunque se mantenga pulsada la tecla
		
		// Si no se pulsa ninguna tecla, volvemos a ejecutar la animación 'idleDuck'
		else {
			this.bird.play('idleDuck', true) // el segundo parámetros de Sprite.play(key [, ignoreIfPlaying]) indica si la llamada se debe ignorar en caso de que ya se esté ejecutando la misma animación
		}
	}

}