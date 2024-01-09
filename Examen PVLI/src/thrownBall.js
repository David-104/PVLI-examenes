export default class ThrownBall extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, thrower){
        super(scene, x, y, 'ball')
        this.thrower = thrower;

        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.setCircle(8);
        this.body.setAllowGravity(false);
        
        this.scene.addBall(this)

        if (this.thrower == 'rat'){
            this.setVelocityY(75)
        }
        else{
            this.setVelocityY(-75)
        }
    }

    preUpdate(){
        if(this.scene.playing){
            if(this.y > 450)
                this.scene.penguin.addBallToSide(this);
            else if (this. y < 175)
                this.scene.rat.addBallToSide(this)
        }
        else{
            this.setVelocity(0, 0)
        }
    }
}