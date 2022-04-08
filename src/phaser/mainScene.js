class mainScene extends Phaser.Scene {
    constructor() {
        super("mainScene");
    }
    create(){
        //Fade into scene
        this.cameras.main.fadeIn(500, 0, 0, 0);

        //Create the map and it's layers from the Tiled JSON data
        this.drawMap();
        this.tileSize = 16;

        //Set the framerate for animations
        this.animFrameRate = 12; //Default: 8

        //create the player and keys
        this.player = new Player(this);
        this.createPlayerAnims();
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        //set the camera to follow player with bounds at the edges of the world
        this.cameras.main.setBounds(0, 0, 51 * this.tileSize, 50 * this.tileSize);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBackgroundColor(0xb6e2a0);

        //set up the NPCS
        this.addNPCs();
        
        
        this.music = this.sound.add("townMusic")
        this.music.loop = true;
        this.music.volume = .3;
        this.music.play();

        this.addDbox();
    }

    update(time, delta){
        this.checkMovement();
        this.talkToNPC();
        this.player.updatePosition(delta);
        this.dboxHandler.updateDbox();
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
        if(!this.player.canMove){return}
        if(Phaser.Input.Keyboard.JustDown(this.enterKey) && !this.player.isMoving){
            this.npcGroup.getChildren().forEach(npc => {
                if(this.player.checkTile(this.player.facing, this) == npc.getTile(this)){
                    npc.sayMessage(this);
                    npc.facePlayer(this.player.facing);
                }
            });
            this.signGroup.getChildren().forEach(sign => {
                if(this.player.checkTile(this.player.facing, this) == sign.getTile(this) && this.player.facing == "up"){
                    sign.sayMessage(this);
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
        
        this.deco = this.map.createLayer('UNDERPLAYER', this.tileset);
        this.deco.depth = 1;

        this.plants = this.map.createLayer('UNDERPLAYER2', this.tileset);
        this.plants.depth = 2;

        this.tree = this.map.createLayer('OVERPLAYER', this.tileset);
        this.tree.depth = 5;

        this.treecorner = this.map.createLayer('OVERPLAYER2', this.tileset);
        this.treecorner.depth = 6;

        this.treecorner = this.map.createLayer('OVERPLAYER3', this.tileset);
        this.treecorner.depth = 7;

        this.collisionLayer = this.map.createLayer('COLLISIONS', this.tileset);
    }

    createPlayerAnims(){
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
            key: "playerWalkLeft1",
            frames: [
                { key: 'player',frame:8 },
                { key: 'player',frame:2 },
                { key: 'player',frame:9 },
                { key: 'player',frame:2 },
            ],
            frameRate: this.animFrameRate,
            repeat: -1
        });
        this.anims.create({
            key: "playerWalkLeft2",
            frames: [
                { key: 'player',frame:9 },
                { key: 'player',frame:2 },
                { key: 'player',frame:8 },
                { key: 'player',frame:2 },
            ],
            frameRate: this.animFrameRate,
            repeat: -1
        });
        this.anims.create({
            key: "playerWalkRight1",
            frames: [
                { key: 'player',frame:10 },
                { key: 'player',frame:1 },
                { key: 'player',frame:11 },
                { key: 'player',frame:1 },
            ],
            frameRate: this.animFrameRate,
            repeat: -1
        });
        this.anims.create({
            key: "playerWalkRight2",
            frames: [
                { key: 'player',frame:11 },
                { key: 'player',frame:1 },
                { key: 'player',frame:10 },
                { key: 'player',frame:1 },
            ],
            frameRate: this.animFrameRate,
            repeat: -1
        });
        this.anims.create({
            key: "arrowAnim",
            frames: "arrow",
            frameRate: 2,
            repeat: -1
        });
    }

    addDbox(){
        this.dbox = this.add.image(0, 0, "dbox").setOrigin(0, 0);
        this.dbox.depth = 9;
        this.dbox.setScrollFactor(0);
        this.dbox.setVisible(false);
        
        this.arrow = this.add.sprite(350, 280, "arrow");
        this.arrow.depth = 12;
        this.arrow.setScrollFactor(0);
        this.arrow.setVisible(false);
        this.arrow.anims.play("arrowAnim");

        this.dboxHandler = new dBox(this);
    }

    addNPCs(){
        //NPCs
        this.npc = new NPC(this, this.calculateTilePos(14), this.calculateTilePos(11), "npc", "1");
        this.npc2 = new NPC(this, this.calculateTilePos(25), this.calculateTilePos(34), "npc", "2");

        //Signs
        this.farmerSign = new NPC(this, this.calculateTilePos(35), this.calculateTilePos(13), "npc", "farmerSign");
        this.homeSign = new NPC(this, this.calculateTilePos(9), this.calculateTilePos(8), "npc", "homeSign");

        //Add to group
        this.npcGroup = this.add.group();
        this.npcGroup.addMultiple([this.npc, this.npc2]);

        this.signGroup = this.add.group();
        this.signGroup.addMultiple([this.farmerSign, this.homeSign]);
        this.signGroup.getChildren().forEach(sign => {sign.setAlpha(0)});
    }
}