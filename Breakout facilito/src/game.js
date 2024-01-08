import PlayScene from "./playScene.js";
window.onload = ()=>{

    const config = {
        type: Phaser.AUTO,
        scale: {
            width: 256,
            height: 192,
            zoom: 3,
            autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY
        },
        pixelArt: true,
        physics: {
            default: 'matter',
            matter: {
                gravity: { y: 0 },
                debug: true
            }
        },
        scene: [PlayScene]
    };
    new Phaser.Game(config);
};