export default class Button extends Phaser.GameObjects.Container {

    /** 
    * Contructor del boton 
    * @param {number} x // posicion x
    * @param {number} y // posicion y
    * @param {String} text // txt
    * @param {int} depth - numero de capa (frente o fondo) con this.depth = depth y añadiendo depth al constructor
    * @param {String} boxSprite // sprite de la caja (en este caso se hace un rectangulo por no haber, mirar boton de MBTI)
    */

    constructor(scene, posX, posY, text, { ClickCallback }) {
        super(scene, posX, posY)

        this.box = scene.add.rectangle(this.x, this.y, 130, 40, 0xffffff);
        
        let texto = scene.add.text(this.x, this.y, text);
        texto.setOrigin(0.5, 0.5) //origen del texto
        texto.setFont('Pixeled') //nombre fuente en el css
        texto.setFontSize(12) //tamaño
        
        texto.setStroke('#000000', 6) //reborde
        texto.setFill('#ffffff'); //color

        this.box.setInteractive();

        this.box.on('pointerdown', ClickCallback);
    }
}