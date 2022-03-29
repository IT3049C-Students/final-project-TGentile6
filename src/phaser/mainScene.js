class mainScene extends Phaser.Scene {
    constructor() {
        super("mainScene");
    }
    create(){
        //Create the map and it's layers from the Tiled JSON data
        this.drawMap();

        //create the player and cursor keys
        this.player = new Player(this)
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        //set the camera to follow player with bounds at the edges of the world
        this.cameras.main.setBounds(0, 0, 51 * 16, 50 * 16);
        this.cameras.main.startFollow(this.player);

        //set up the NPCS
        this.npc = new NPC(this, this.calculateTilePos(10), this.calculateTilePos(25), "npc", "1");
        this.npc2 = new NPC(this, this.calculateTilePos(25), this.calculateTilePos(34), "npc", "2");
        this.npc2.updateSpriteDirection("down");
        this.npcGroup = this.add.group();
        this.npcGroup.addMultiple([this.npc, this.npc2])
        
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

    calculateTilePos(num){ //returns the center position of the tile when you input the grid number of the tile
        return num * 16 + 8;
    }

    checkIfOccupiedTile(tile){ //returns false if any NPCs are located at the tile the player is trying to move to.
        let occupied = false;
        this.npcGroup.getChildren().forEach(npc => {
            if(npc.getTile(this) == tile){
                occupied = true;
                return occupied;
            }
        });
        return occupied;
    }

    drawMap(){
        this.map = this.make.tilemap({key :'newMap'});
        this.tileset = this.map.addTilesetImage('PKMN Tiles', 'newTiles');

        this.grass = this.map.createLayer('GRASS', this.tileset);
        
        this.deco = this.map.createLayer('GRASSDECORATION', this.tileset);
        this.deco.depth = 1;

        this.plants = this.map.createLayer('PLANTS', this.tileset);
        this.plants.depth = 2;

        this.tree = this.map.createLayer('TREE', this.tileset);
        this.tree.depth = 3;

        this.treecorner = this.map.createLayer('TREECORNER', this.tileset);
        this.treecorner.depth = 4;

        this.collisionLayer = this.map.createLayer('COLLISIONS', this.tileset);
    }
}