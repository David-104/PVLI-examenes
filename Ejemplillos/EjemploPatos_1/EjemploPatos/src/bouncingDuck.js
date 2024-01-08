import BirdWithHat from './birdWithHat.js';

/**
 * Clase para un pato que rebota con los bordes del canvas, tendrá físicas, y podrá tener sombrero... toda una genialidad!
 */
export default class BouncingDuck extends BirdWithHat {
	/**
	 * 
	 * @param {Scene} scene - escena donde estará el patooooo!
	 * @param {number} x - posición x
	 * @param {number} y - posición y
	 * @param {Hat} hat - sombrero del pato, puede ser null/undefined y no tener sombrero
	 */
	constructor(scene, x, y, hat){
		super(scene, x, y, 'duck', hat, -4, -24); //llamamos al constructor padre (ese -4 y -24 son para colocar el sombrero en la cabeza y no en los pies)

		// llamamos a la animación de 'idleDuck'
		// Ojo cuidado... IMPORTANTE! ..... Esto funciona porque hemos definido la animación globalmente con la primera instancia de Pato que hemos realizado en el nivel1
		this.bird.play('idleDuck')

		// Seteamos al contenedos 2 veces el tamaño del pájaro. Importante porque al introducirle físicas después, cogera este tamaño para el tamaño del collider
		this.setSize(this.bird.width*2, this.bird.height*2);

		// Añadimos el pato a las físicas, a partir de este momento, el objeto, tendrá un 'body'
		this.scene.physics.add.existing(this);

		// Ahora hacemos que ese 'body' rebote con el 'cavas'
		this.body.setCollideWorldBounds();
		this.body.setBounce(1,1); // 1, 1 indica que la escala de la fuerza se mantendrá igual con cada rebote... probad a cambiarlo por valores menores y mayores

		// Queremos que el pato se mueva lateralmente, así que le damos una velocidad en X de 50. Por debajo, Phaser, ya tiene en cuenta el tiempo entre frames, no nos tenemos que preocupar de ello a diferencia del caso de los pájaros cuando cambiabamos nosotros su posicón X
		this.body.setVelocity(50, 0)
	}

	/**
	 * Sobrescribimos el update del padre, ahora nos moveremos con físicas.
	 * @param {*} t 
	 * @param {*} dt 
	 */
	preUpdate(t, dt){
		this.bird.preUpdate(t, dt); //importante, que si no el pájaro no tendrá animcación

		if(this.body.onFloor()){ // detectamos si hemos pisado suelo, es decir, otro objeto estático (como el 'mundo') y desde arriba
			console.log("suelo")
		}
	}

}