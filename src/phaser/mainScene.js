class mainScene extends Phaser.Scene {
    constructor() {
        super("mainScene");
    }
    create(){
        this.add.text(config.width/2, config.height/2, "Playing Game").setOrigin(0.5);

        this.map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
        this.tileset = this.map.addTilesetImage('tiles', null, 32, 32, 1, 2);
        this.layer = this.map.createLayer(0, this.tileset, 0, 0);

        this.player = new Player(this)
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        //test
        // console.log(this.player.getFacing());
        // this.player.moveTileCheck("right", this.layer);
        // console.log(this.player.getFacing());
        // this.player.moveTileCheck("down", this.layer);
        // console.log(this.player.getFacing());
    }

    update(){
        this.checkMovement();
    }

    checkMovement(){
        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W))){
            this.player.moveTileCheck("up", this.layer);
            this.player.updateSpriteDirection("up");
        }
        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S))){
            this.player.moveTileCheck("down", this.layer);
            this.player.updateSpriteDirection("down");
        }
        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A))){
            this.player.moveTileCheck("left", this.layer);
            this.player.updateSpriteDirection("left");
        }
        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D))){
            this.player.moveTileCheck("right", this.layer);
            this.player.updateSpriteDirection("right");
        }
    }

    callLog(player){
        console.log(player.getPlayerTile().x + " " + player.getPlayerTile().y)
    }
}