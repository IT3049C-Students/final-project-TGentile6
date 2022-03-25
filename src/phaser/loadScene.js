class loadScene extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    preload(){
        this.load.image('tiles', 'assets/tiles/testTiles.png');
        this.load.spritesheet("player", "assets/sprites/testPlayerSprite.png",{
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("npc", "assets/sprites/testNPCSprite.png",{
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.tilemapCSV('map', 'assets/tiles/testGrid.csv');
    }

    create(){
        this.add.text(config.width/2, config.height/2, "Loading Game...").setOrigin(0.5);
        this.scene.start("mainScene");
    }
}