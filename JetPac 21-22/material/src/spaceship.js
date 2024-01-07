export default class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key){
        super(scene, x, y, key)
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.setDepth(1);
        this.body.setAllowGravity(false);
    }

    playerCollision(){
        if (this.scene.physics.world.overlap(this, this.scene.player) && this.scene.player.carryingFuel){
            this.scene.deliverFuel();
        }
    }

}