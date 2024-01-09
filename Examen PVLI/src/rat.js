import Ball from "./ball.js";
import ThrownBall from "./thrownBall.js";

export default class Rat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'rat');
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        //this.setDepth(5); profundidad, valor mas alto mas delante
        this.stunned = false;
        this.onBall = false;
        this.ball;
        this.carryingBall = false;
        this.numBalls = 5;
        // Ajustar el tamaño del cuerpo de físicas para que coincida con el sprite visual
        this.body.setSize(32, 32);
        this.body.setImmovable(true);
        this.cursors = scene.input.keyboard.addKeys({
            space: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT
        });

        this.throwInputBuffer; //variable para conseguir una unica lectura del teclado al lanzar
    }

    preUpdate(t, dt) {
        if(this.scene.playing){
            super.preUpdate(t, dt); //que son la t y dt? ni idea pero hacen falta para las animaciones
            if (!this.stunned)
                this.movement();
            else {
                const endStun = () => {
                    this.stunned = false;
                    //animacion normal
                }
                this.scene.time.addEvent({
                    delay: (2000),
                    loop: false,
                    callback: endStun,
                    callbackScope: this
                });
            }
        }
        else{
            this.setVelocity(0, 0)
        }
    }

    movement() {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-75) //tambien existe this.body.setVelocity(x,y); (no se si el body hace falta)
        }
        else if (this.cursors.right.isDown) {
            this.setVelocityX(75)
        }
        else {
            this.setVelocityX(0)
            //this.anims.play('idlePlayer');
        }

        if (this.cursors.space.isDown) {
            if(!this.throwInputBuffer){
                if (this.carryingBall) {
                    let ballThrown = new ThrownBall(this.scene, this.x, this.y, 'rat')
                    this.carryingBall = false;
                    this.numBalls--;
                }
                else if (this.onBall && !this.carryingBall) {
                    this.ball.destroy();
                    //animacion coger
                    this.onBall = false;
                    this.carryingBall = true;
                }
            }
            this.throwInputBuffer = true;
        }
        else{
            this.throwInputBuffer = false;
        }

        //bordes mesa
        if (this.x < 115) {
            this.setVelocityX(10)
        }
        else if (this.x > 351) {
            this.setVelocityX(-10)

        }

        /*if(this.carryingFuel){
            this.auxFuel.x = this.x;
            this.auxFuel.y = this.y - 10;
        }*/
    }

    pickUpBall(ball) {
        this.onBall = true;
        this.ball = ball;
    }

    hit(ball){
        //animacion hit
        this.stunned = true;
        this.addBallToSide(ball)
    }

    
    addBallToSide(ball){
        let x = ball.x
        ball.destroy();
        let newBall = new Ball(this.scene, x, this.y);
        this.numBalls++;
    }
}