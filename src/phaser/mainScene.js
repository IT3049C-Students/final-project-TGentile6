class mainScene extends Phaser.Scene {
    constructor() {
        super("mainScene");
    }
    create(){
        this.add.text(config.width/2, config.height/2, "Playing Game").setOrigin(0.5);

        this.map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
        this.tileset = this.map.addTilesetImage('tiles', null, 32, 32, 1, 2);
        this.layer = this.map.createLayer(0, this.tileset, 0, 0);

        this.player = new Player(this) //Creates player from player class
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.npc = new NPC(this, this.calculateTilePos(6), this.calculateTilePos(2), "npc", "1");
        this.npc2 = new NPC(this, this.calculateTilePos(16), this.calculateTilePos(14), "npc", "2");
        this.npc2.updateSpriteDirection("down");
        this.npcGroup = this.add.group();
        this.npcGroup.addMultiple([this.npc, this.npc2])

        this.canMove = true; //value to check if the player is currently allowed to move
        this.inDialogue = false; //value to check if the player is currently reading dialogue
    }

    update(){
        this.checkMovement();
        this.talkToNPC();
    }

    checkMovement(){
        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W))){
            this.player.moveTile("up", this);
            this.player.updateSpriteDirection("up");
        }
        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S))){
            this.player.moveTile("down", this);
            this.player.updateSpriteDirection("down");
        }
        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A))){
            this.player.moveTile("left", this);
            this.player.updateSpriteDirection("left");
        }
        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D))){
            this.player.moveTile("right", this);
            this.player.updateSpriteDirection("right");
        }
    }

    talkToNPC(){
        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER))){
            this.npcGroup.getChildren().forEach(npc => {
                if(this.player.checkTile(this.player.facing, this) == npc.getTile(this)){
                    npc.sayMessage(this);
                    npc.updateSpriteDirection(this.player.facing);
                }
            });
        }
    }

    callLog(player){
        console.log(player.getPlayerTile().x + " " + player.getPlayerTile().y)
    }

    calculateTilePos(num){ //returns the center position of the tile when you input the grid number of the tile
        return num * 32 + 16;
    }

    checkIfOccupiedTile(tile){ //returns false if any NPCs are located at the tile the player is trying to move to.
        let occupied = false;
        this.npcGroup.getChildren().forEach(npc => {
            if(npc.getTile(this) == tile){
                occupied = true;
                return occupied
            }
        });
        return occupied
    }
}