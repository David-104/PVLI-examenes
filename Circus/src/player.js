export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'clown')
        this.setScale(3, 3)
        this.setDepth(2)
        this.scene.add.existing(this);


        this.lion = this.scene.add.sprite(this.x - 5, this.y + 50, 'lion')
        this.lion.setScale(3, 3);
        this.lion.anims.play('lionIdle')
        this.lion.setDepth(2)

        this.scene.physics.world.enable(this);
        this.body.setSize(20, 35);
        this.body.setOffset(-2.5, 0);

        this.cursors = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            interact: Phaser.Input.Keyboard.KeyCodes.E,
            esc:  Phaser.Input.Keyboard.KeyCodes.ESC
        });

        this.movementSpeed = 150

        this.jumpSound = this.scene.sound.add('jumpSound')
    }

    preUpdate(t,dt) {
        if(!this.scene.endGame){
            super.preUpdate(t,dt)
            this.move();        
        }
        else{
            this.setVelocity(0, 0)
            this.body.setAllowGravity(false);
         }
    }

    move(){
        if(this.cursors.left.isDown && this.body.touching.down){
            this.setVelocityX(-this.movementSpeed)
            this.anims.play('clownWalk', true)
            this.lion.anims.play('lionWalk', true)
        }
        else if(this.cursors.right.isDown && this.body.touching.down){
            this.setVelocityX(this.movementSpeed)
            this.anims.play('clownWalk', true)
            this.lion.anims.play('lionWalk', true)
        }
        else{
            if(this.body.touching.down){
                this.lion.anims.play('lionIdle')
                this.setVelocityX(0);
            }
        }

        if (this.cursors.up.isDown && this.body.touching.down)
        {
            this.setVelocityY(-400);
            this.anims.play('clownJump');
            this.lion.anims.play('lionJump', true);
            this.jumpSound.play();
        }
        
        this.adjustLionPos();
    }

    adjustLionPos(){
        this.lion.x = this.x - 5;
        this.lion.y = this.y + 50;
    }
}