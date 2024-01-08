import Level from './level.js';
import Level2 from './level2.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 * Doc: https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig
 */
let config = {
    type: Phaser.AUTO,
    parent: 'juego',
    // type: Phaser.CANVAS,
    // canvas: document.getElementById("juego"),
    width:  656,
    height: 656,
    pixelArt: true,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		// Configuramos phaser para que se adapte al tamaño de pantalla donde ejecutadmos
		// con un mínimo y un máximo de tamaño
		mode: Phaser.Scale.FIT,
		min: {
            width: 328,
            height: 328
        },
		max: {
            width: 1312,
            height: 1312
        },
		zoom: 1
    },
    scene: [Level, Level2],
    /** 
     * Añadimos físicas, exite también otro motor más avanzado (Matter)
     */
    physics: {
        default: 'arcade', // elegir motor
        arcade: { // propiedades del motor
            gravity: { y: 300 }, // gravedad, probad a cambiarla, puede ser un poco tedioso ajustarla a los valores que vayan bien para nuestro juego
            debug: true // true para ver info
        }
    },
    title: "Clases",
    version: "1.0.0"
};

new Phaser.Game(config);