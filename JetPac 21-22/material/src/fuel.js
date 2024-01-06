export default class Fuel extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key){
        super(scene, x, y, key)
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
    }
}