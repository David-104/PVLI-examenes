import BaseScene from "./base.js"
/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.AUTO,
    width:  800,
    height: 600,
    pixelArt: true,
	scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    scene: [BaseScene],
    physics: { 
        default: 'arcade', 
        arcade: { 
            gravity: { y: 200 }, 
            debug: false 
        } 
    }
};

new Phaser.Game(config);