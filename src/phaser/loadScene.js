class loadScene extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    preload(){
        this.load.image('newTiles', 'assets/tiles/newTiles.png');
        this.load.tilemapTiledJSON('newMap', 'assets/tiles/Map.json');
        this.load.image("dbox", "assets/sprites/DBox.png");
        this.load.spritesheet("arrow", "assets/sprites/Arrow.png",{
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("player", "assets/sprites/testPlayerSprite2.png",{
            frameWidth: 16,
            frameHeight: 24
        });
        this.load.spritesheet("npc", "assets/sprites/testNPCSprite.png",{
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.audio("townMusic", "assets/tony by rawin.mp3");
        this.load.tilemapCSV('map', 'assets/tiles/testGrid.csv');
        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
    }

    create(){
        this.add.text(config.width/2, config.height/2, "Loading Game...").setOrigin(0.5);
        this.scene.start("mainScene");
    }
}