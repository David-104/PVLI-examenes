export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key){
        super(scene, x, y, key);
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        //this.setDepth(5); profundidad, valor mas alto mas delante
        this.playerOffset = { x: 0, y: 0 };
        this.isDead = false;
        this.carryingFuel = false;
        // Ajustar el tamaño del cuerpo de físicas para que coincida con el sprite visual
        this.body.setSize(17, 24);
        this.body.setOffset(this.playerOffset.x, this.playerOffset.y);


        this.w = this.scene.input.keyboard.addKey('W');
        this.a = this.scene.input.keyboard.addKey('A');
        this.d = this.scene.input.keyboard.addKey('D');

        //tambien se puede meter un on objeto:
        /*        
        this.cursors = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
         */
        //p ej: se accede con: this.cursors.left.isDown 
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt); //que son la t y dt? ni idea pero hacen falta para las animaciones
        this.movement();
    }

    movement(){
        if(this.a.isDown){
            this.setVelocityX(-75) //tambien existe this.body.setVelocity(x,y); (no se si el body hace falta)
            this.flipX = true;
            if (this.body.blocked.down || this.body.touching.down) {
                this.anims.play('walkingPlayer', true);
            }
        }
        else if(this.d.isDown){
            this.setVelocityX(75)
            this.flipX = false;
            if (this.body.blocked.down || this.body.touching.down) {
                this.anims.play('walkingPlayer', true);
            }
        }
        else
        {
            this.setVelocityX(0)
            if (this.body.blocked.down || this.body.touching.down) {
                this.anims.play('idlePlayer');
            }
        }

        if(this.w.isDown){
            this.setVelocityY(-100)
            this.anims.play('flyingPlayer', true);
        }

        //toroidal
        if(this.x < -0)
            this.x = 256;
        else if(this.x > 256)
            this.x = 0;

        if(this.carryingFuel){
            this.auxFuel.x = this.x;
            this.auxFuel.y = this.y - 10;
        }
    }

    carryFuel(){
        this.carryingFuel = true;
        this.auxFuel = this.scene.add.sprite(this.x, this.y - 10, "fuel");
    }
}