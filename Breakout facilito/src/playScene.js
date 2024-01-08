import Block from "./block.js";
import Pala from "./pala.js";

export default class PlayScene extends Phaser.Scene {
    constructor () {
        super ({key: 'play'})
        
    }

    init(){

    }

    preload(){
        this.load.image('block', './assets/block.png')
        this.load.image('ball', './assets/ball.png')
    }

    create(){
        this.numFils = 4;
        this.numCols = 10;

        this.blocks = []

        for (var i = 0; i < this.numFils; i++){
            for (var j = 0; j < this.numCols; j++){
                this.addBlock( j * 25 + 15, i * 20 + 10)
            }
        }

        this.createBall();

        this.pala = new Pala(this, 128, 180, 'block')
    }

    update(){

    }

    addBlock(x, y){
        let block = new Block(this, x, y, 'block', 10);
        this.blocks.push(block);
    }

    createBall(){
        this.ball = this.matter.add.image(100, 100, 'ball');
        this.ball.setScale(0.025, 0.025)
        this.ball.tint = 0xff0000;
        this.ball.setMass(50)
        this.ball.applyForce({x: 0.15, y: 0.15});
        console.log(this.ball)
    }
}