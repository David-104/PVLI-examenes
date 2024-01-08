export default class Ring extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'ring')
        this.setScale(3, 3)
        this.setDepth(1)
        
        this.scene.add.existing(this);        
        this.scene.physics.world.enable(this);
        this.body.setAllowGravity(false);

        this.body.setSize(25, 10);
        this.body.setOffset(0, 75);
        this.body.setImmovable(true);

        this.ringDelantero = this.scene.add.sprite(this.x, this.y, 'ring')
        this.ringDelantero.setScale(3, 3)
        this.ringDelantero.setDepth(2)
        this.ringDelantero.setCrop(13, 0, 13, 80);
    }

    preUpdate(t, dt){
        if(!this.scene.endGame){
            super.preUpdate(t, dt)
            this.move();
            if(this.x + this.width < this.scene.cameras.main.scrollX){
                this.ringDelantero.destroy();
                this.destroy();
            }
        }
        else{
           this.setVelocity(0, 0)
        }
    }

    move(){
        this.setVelocityX(-10);
        this.ringDelantero.x = this.x
    }
}