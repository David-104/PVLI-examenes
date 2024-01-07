export default class Fuel extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key){
        super(scene, x, y, key)
        this.isDead = false;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this); //se puede acceder al body solo despues de añadirlo!!!

        this.offset = { x: 0, y: 0}
        this.body.setSize(18, 11);
        this.body.setOffset(this.offset.x, this.offset.y);
    }

    pickUpCollision(){
        if(this.isDead){
            return false;
        }
        if(this.scene.physics.world.overlap(this, this.scene.player) && !this.scene.player.carryingFuel){
            this.scene.pickUpFuel();
            this.isDead = true
            this.destroy()
        }
    }
}