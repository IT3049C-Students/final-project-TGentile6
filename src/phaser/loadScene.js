class loadScene extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    preload(){
        this.load.image('tiles', 'assets/tiles/testTiles.png');
        this.load.image('newTiles', 'assets/tiles/pkmntiles.png');
        this.load.tilemapTiledJSON('newMap', 'assets/tiles/TESTMAP.json');
        this.load.image("dbox", "assets/sprites/dialoguebox.png");
        this.load.spritesheet("player", "assets/sprites/testPlayerSprite.png",{
            frameWidth: 16,
            frameHeight: 16
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