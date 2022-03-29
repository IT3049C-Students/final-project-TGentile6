class loadScene extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    preload(){
        this.load.image('tiles', 'assets/tiles/testTiles.png');
        this.load.image('newTiles', 'assets/tiles/pkmntiles.png')
        this.load.tilemapTiledJSON('newMap', 'assets/tiles/TESTMAP.json')
        this.load.spritesheet("player", "assets/sprites/testPlayerSprite.png",{
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("npc", "assets/sprites/testNPCSprite.png",{
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.tilemapCSV('map', 'assets/tiles/testGrid.csv');
    }

    create(){
        this.add.text(config.width/2, config.height/2, "Loading Game...").setOrigin(0.5);
        this.scene.start("mainScene");
    }
}