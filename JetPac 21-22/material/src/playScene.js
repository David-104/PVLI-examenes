export default class PlayScene extends Phaser.Scene {
    constructor(){
        super({key: 'play'});
    }

    init(params){
        //console.log(params) //para pasar parametros de una escena a otra se meten en un objeto
        this.fuelNum = params.fuelNum;
        this.spawnTime = params.spawnTime;
    }

    preload(){
        this.load.tilemapTiledJSON('tilemap', './assets/map/tilemap.json'); //carga tilemap
        this.load.image('tileset', './assets/sprites/tileset.png'); //carga atlas de patrones
    }

    create(){
        const map = this.make.tilemap({
            key: "tilemap",
            tileWidth: 8,
            tileHeight: 8
        })

        const tileset = map.addTilesetImage("ground_ts","tileset");

        this.groundLayer = map.createLayer('ground', tileset);
    }
}