import MainMenu from "./MainMenu.js"; 
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
            default: 'arcade',
            arcade: {
                gravity: { y: 480 },
                debug: true
            }
        },
        scene: [MainMenu, PlayScene]
    };
    new Phaser.Game(config);
};