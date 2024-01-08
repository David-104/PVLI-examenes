export default class Block extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, key, points){
        super(scene.matter.world, x, y, key)
        this.points = points;
            
        this.scene.add.existing(this)

        this.setScale(0.012, 0.01)
        /*this.setBody({ //ajuste de la colision
            type: 'rectangle',
            width: 20,
            height: 10
        });*/

    }
}