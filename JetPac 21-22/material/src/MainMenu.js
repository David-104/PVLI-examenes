import Button from "./button.js";

export default class MainMenu extends Phaser.Scene {
	constructor() {
		
		super({ key: 'mainMenu'});
	}

	preload () {
	}
	
	create (){
		let botonF = new Button(this, 128, 54, "Facil", { "ClickCallback": () => this.startGame(2, 2)})
		let botonI = new Button(this, 128, 108, "Intermedio", { "ClickCallback": () => this.startGame(3, 1)})
		let botonD= new Button(this, 128, 162, "Dificil", { "ClickCallback": () => this.startGame(5, 0.5)})
	}

	startGame(fuelNum, spawnTime){
		this.scene.start('play', {fuelNum, spawnTime})
	}
  }