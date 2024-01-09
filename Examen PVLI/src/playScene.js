import Ball from "./ball.js";
import Penguin from "./penguin.js";
import Rat from "./rat.js";

export default class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'play' });
    }

    init(params) {
        //recibir de params si hay dos jugadores y en base a eso hacer en el update de la rata ambos casos (controlada por jugador o por IA)
    }

    create() {
        this.playing = true;
        this.thrownBalls = []

        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.table = this.add.image(110, 175, 'table').setOrigin(0, 0)
        this.penguin = new Penguin(this, 200, 450)
        this.rat = new Rat(this, 200, 175);

        for (var i = 0; i < 5; i++) {
            let ball = new Ball(this, 40 * i + 150, 450)
        }

        for (var i = 0; i < 5; i++) {
            let ball = new Ball(this, 40 * i + 150, 175)
        }
    }

    update() {

        if(this.penguin.numBalls == 10 || this.rat.numBalls == 10){
            this.endGame();
        }

        const end = () => {
            this.endGame()
        }

        this.time.addEvent({
            delay: (90000),
            loop: false,
            callback: end,
            callbackScope: this
        });

    }

    addBall(ball) {
        console.log(this.thrownBalls)
        this.physics.add.collider(ball, this.thrownBalls);
        this.thrownBalls.push(ball);
        if (ball.thrower == 'rat') {
            this.physics.add.collider(ball, this.penguin, () => {
                this.penguin.hit(ball);
            });
        }
        else {
            this.physics.add.collider(ball, this.rat, () => {
                this.rat.hit(ball)
            });
        }

    }

    endGame(){
        this.playing = false;
        let text;
        if(this.penguin.numBalls < this.rat.numBalls){
            text = "Penguin wins"
        }
        else if (this.penguin.numBalls > this.rat.numBalls){
            text = "Rat wins"
        }
        else{
            text = "Tie"
        }
        let winner = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            text,
            {
                fontFamily: 'babelgam',
                fontSize: 50,
                color: 'White'
            }
        ).setOrigin(0.5, 0.5);

        let score = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 100,
            this.penguin.numBalls + " / " + this.rat.numBalls,
            {
                fontFamily: 'babelgam',
                fontSize: 50,
                color: 'White'
            }
        ).setOrigin(0.5, 0.5);

        this.time.delayedCall(4000, () => { 
            this.scene.start('Menu');
        }, [], this);
    }

}