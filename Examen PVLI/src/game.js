import Boot from "./boot.js";
import Menu from "./menu.js";
import PlayScene from "./playScene.js";
let config = {
	type: Phaser.AUTO,
	parent: 'juego',
	pixelArt: true,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		mode: Phaser.Scale.FIT,
		width: 512,
		height: 512,
		zoom: 1
	},
	scene: [],
	physics: { 
		default: 'arcade', 
		arcade: { 
			debug: true 
		},
		checkCollision: {
			up: true,
			down: true,
			left: true,
			right: true
		}
	},
	scene: [ Boot, Menu, PlayScene ],
	title: "PVLI Ordinaria 23/24",
	version: "1.0.0",
	transparent: false
};

new Phaser.Game(config);