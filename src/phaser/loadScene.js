class loadScene extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    preload(){
        //Title Screen
        this.load.image('titleScreen', 'assets/TitleScreen.png');
        this.load.image('Logo', 'assets/FetchQuest.png');
        this.load.spritesheet('pressStart', 'assets/sprites/PressStart.png', {
            frameWidth: 300,
            frameHeight: 18
        });
        this.load.image('blackScreen', 'assets/sprites/TheBigBlack.png');

        //Map Data
        this.load.image('newTiles', 'assets/tiles/newTiles.png');
        this.load.tilemapTiledJSON('newMap', 'assets/tiles/Map.json');

        //Controls
        this.load.image('controls', 'assets/sprites/controls.png');


        //Dialogue Boxes
        this.load.image("dbox", "assets/sprites/DBox.png");
        this.load.spritesheet("arrow", "assets/sprites/Arrow.png",{
            frameWidth: 16,
            frameHeight: 16
        });

        //Character Sprites
        this.load.spritesheet("player", "assets/sprites/testPlayerSprite2.png",{
            frameWidth: 16,
            frameHeight: 24
        });
        this.load.spritesheet("npc", "assets/sprites/testNPCSprite.png",{
            frameWidth: 16,
            frameHeight: 16
        });

        //Music
        this.load.audio("townMusic", "assets/tony by rawin.mp3");

        //Items
        this.load.image('itemBox', 'assets/items/itemBox.png');
        this.load.image('carrot', 'assets/items/carrot.png');
        this.load.image('noItem', 'assets/items/default.png');
        
    }

    create(){
        //Title Screen graphics
        this.add.image(0,0,"titleScreen").setOrigin(0);
        this.add.image(25,25,"Logo").setOrigin(0).setScale(2);
        this.anims.create({
            key: "pressStartAnim",
            frames: [
                { key: 'pressStart',frame:0 },
                { key: 'pressStart',frame:1 },
            ],
            frameRate: 2,
            repeat: -1
        });
        this.add.sprite(200, 260,"pressStart").anims.play("pressStartAnim");

        //Start Game handler
        this.input.keyboard.once('keydown-ENTER', () => {
            this.cameras.main.fadeOut(500, 0, 0, 0)
        })
    
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('mainScene')
        })
        
    }
}