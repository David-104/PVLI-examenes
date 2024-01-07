export default class Meteor extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, key, direction){
        super(scene, x, y, key)
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        
        this.body.setAllowGravity(false);
        this.body.setVelocity(direction, 50);

        this.isDead = false

        this.explosionS = this.scene.sound.add('explosion', {loop: false})
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt)
        this.move();
    }

    move(){
        //toroidal
        if(this.x < -0)
            this.x = 256;
        else if(this.x > 256)
            this.x = 0;
    }

    collisions(){
        if(this.isDead){
            return false;
        }
        this.playerCollision();
        this.floorCollision();
    }

    playerCollision(){
        if(this.scene.physics.world.overlap(this, this.scene.player) && !this.isDead){
            this.freeze();
            this.anims.play('meteorExp', true); //animacion

            this.scene.player.isDead = true;
            this.explosionS.play();
        }
    }

    floorCollision(){
        if(this.body.blocked.down || this.body.touching.down || this.body.blocked.left || this.body.blocked.right){
            this.freeze();
            this.anims.play('meteorExp', true); //animacion
            this.isDead = true;
            this.explosionS.play();
            this.scene.time.delayedCall(2000, () => {
                this.destroy()
            }, [], this);  
        }
    }

    freeze(){
        this.body.setVelocity(0, 0);
    }
}