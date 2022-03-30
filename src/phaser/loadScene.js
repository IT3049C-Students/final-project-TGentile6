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
        this.load.audio("townMusic", "assets/tony by rawin.mp3");
        this.load.tilemapCSV('map', 'assets/tiles/testGrid.csv');
        this.animFrameRate = 10;
    }

    create(){
        this.add.text(config.width/2, config.height/2, "Loading Game...").setOrigin(0.5);
        this.scene.start("mainScene");
        this.anims.create({
            key: "playerWalkUp1",
            frames: [
                { key: 'player',frame:6 },
                { key: 'player',frame:3 },
                { key: 'player',frame:7 },
                { key: 'player',frame:3 },
            ],
            frameRate: this.animFrameRate,
            repeat: -1
        });
        this.anims.create({
            key: "playerWalkUp2",
            frames: [
                { key: 'player',frame:7 },
                { key: 'player',frame:3 },
                { key: 'player',frame:6 },
                { key: 'player',frame:3 },
            ],
            frameRate: this.animFrameRate,
            repeat: -1
        });

        this.anims.create({
            key: "playerWalkDown1",
            frames: [
                { key: 'player',frame:4 },
                { key: 'player',frame:0 },
                { key: 'player',frame:5 },
                { key: 'player',frame:0 },
            ],
            frameRate: this.animFrameRate,
            repeat: -1
        });
        this.anims.create({
            key: "playerWalkDown2",
            frames: [
                { key: 'player',frame:5 },
                { key: 'player',frame:0 },
                { key: 'player',frame:4 },
                { key: 'player',frame:0 },
            ],
            frameRate: this.animFrameRate,
            repeat: -1
        });
        this.anims.create({
            key: "playerWalkLeft",
            frames: [
                { key: 'player',frame:8 },
                { key: 'player',frame:2 },
            ],
            frameRate: this.animFrameRate,
            repeat: -1
        });
        this.anims.create({
            key: "playerWalkRight",
            frames: [
                { key: 'player',frame:9 },
                { key: 'player',frame:1 },
            ],
            frameRate: this.animFrameRate,
            repeat: -1
        });
    }
}