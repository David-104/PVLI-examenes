export default class Pala extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, key){
        super(scene.matter.world, x, y, key)
            
        this.scene.add.existing(this)

        this.setScale(0.025, 0.005)
        this.tint = 0x5555ff;
        /*this.setBody({ //ajuste de la colision
            type: 'rectangle',
            width: 20,
            height: 10
        });*/
        this.cursors = scene.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    preUpdate(){
        super.preUpdate();
        this.movement();
    }

    movement(){
        if(this.cursors.left.isDown){
            this.setVelocityX(-1)
        }
        else if (this.cursors.right.isDown){
            this.setVelocityX(1)
        }
        else
        this.setVelocityX(0);
    }
}