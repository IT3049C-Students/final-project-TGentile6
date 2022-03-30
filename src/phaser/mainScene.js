class mainScene extends Phaser.Scene {
    constructor() {
        super("mainScene");
    }
    create(){
        //Create the map and it's layers from the Tiled JSON data
        this.drawMap();
        this.tileSize = 16;

        //create the player and keys
        this.player = new Player(this);
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        //set the camera to follow player with bounds at the edges of the world
        this.cameras.main.setBounds(0, 0, 51 * this.tileSize, 50 * this.tileSize);
        this.cameras.main.startFollow(this.player);

        //set up the NPCS
        this.npc = new NPC(this, this.calculateTilePos(10), this.calculateTilePos(25), "npc", "1");
        this.npc2 = new NPC(this, this.calculateTilePos(25), this.calculateTilePos(34), "npc", "2");
        this.npc2.updateSpriteDirection("down");
        this.npcGroup = this.add.group();
        this.npcGroup.addMultiple([this.npc, this.npc2])
        this.music = this.sound.add("townMusic")
        this.music.loop = true;
        this.music.volume = .3;
        this.music.play();
        
    }

    update(time, delta){
        this.checkMovement();
        this.talkToNPC();
        this.player.updatePosition(delta);
    }

    checkMovement(){
        if(this.wKey.isDown && this.player.lastMovement == ""){
            this.player.moveTile("up");
            // this.movePhys.movePlayer("up");
        }
        if(this.sKey.isDown && this.player.lastMovement == ""){
            this.player.moveTile("down");
            // this.movePhys.movePlayer("down");
        }
        if(this.aKey.isDown && this.player.lastMovement == ""){
            this.player.moveTile("left");
            // this.movePhys.movePlayer("left");
        }
        if(this.dKey.isDown && this.player.lastMovement == ""){
            this.player.moveTile("right");
            // this.movePhys.movePlayer("right");
        }
    }

    talkToNPC(){
        if(Phaser.Input.Keyboard.JustDown(this.enterKey) && !this.player.isMoving){
            this.npcGroup.getChildren().forEach(npc => {
                if(this.player.checkTile(this.player.facing, this) == npc.getTile(this)){
                    npc.sayMessage(this);
                    npc.updateSpriteDirection(this.player.facing);
                }
            });
        }
    }

    calculateTilePos(num){ //returns the center position of the tile when you input the grid number of the tile
        return num * this.tileSize + (this.tileSize / 2);
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
        this.plants.depth = 3;

        this.tree = this.map.createLayer('TREE', this.tileset);
        this.tree.depth = 4;

        this.treecorner = this.map.createLayer('TREECORNER', this.tileset);
        this.treecorner.depth = 5;

        this.collisionLayer = this.map.createLayer('COLLISIONS', this.tileset);
    }
}