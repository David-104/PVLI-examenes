export default class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'ball');
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.setCircle(8);
    }

    preUpdate(){
        super.preUpdate();
        this.pickUp();
    }

    pickUp(){
        if(this.scene.physics.world.overlap(this, this.scene.penguin)){
            this.scene.penguin.pickUpBall(this);
        }
        if(this.scene.physics.world.overlap(this, this.scene.rat)){
            this.scene.rat.pickUpBall(this);
        }
    }
}