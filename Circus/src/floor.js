export default class Floor extends Phaser.GameObjects.Sprite {

    constructor(scene, y, width) {
      super(scene, 0, y);
  
      this.scene.add.existing(this);
      //el segundo true es para que sea estático
      //al ser estático no le afecta la gravedad
      this.scene.physics.add.existing(this, true);
  
      this.scene.physics.add.collider(this);
  
      // Cambiamos el tamaño del body para ocupar todo el ancho de la escena
      this.body.width = width;
      this.body.height = 20;
    }
  }