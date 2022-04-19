class mainScene extends Phaser.Scene {
    constructor() {
        super("mainScene");
    }
    create(){
        //Create the map and it's layers from the Tiled JSON data
        this.drawMap();
        this.tileSize = 16;
        

        //Set the framerate for animations
        this.animFrameRate = 12; //Default: 12

        //create the player and keys
        this.player = new Player(this);
        this.createPlayerAnims();
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.cKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        //set the camera to follow player with bounds at the edges of the world
        this.cameras.main.setBounds(0, 0, 51 * this.tileSize, 50 * this.tileSize);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBackgroundColor(0xb6e2a0);
        this.blackScreen = this.add.image(0, 0, "blackScreen").setOrigin(0).setAlpha(0).setDepth(12);

        //set up the NPCS
        this.addNPCs();
        
        //Music
        this.music = this.sound.add("townMusic")
        this.music.loop = true;
        this.music.volume = .3;
        this.music.play();

        //Creates handlers for Dialogue Boxes and Items
        this.addDboxHandler();
        this.addItemHandler();

        //ControlsBox
        this.addControlsBox();

        //Create Game Logic Handler
        this.addGameLogic();

        //Fade into scene
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, (cam, effect) => {
            this.gameLogic.startGame();
        })
    }

    update(time, delta){
        this.checkMovement();
        this.interactionHandler();
        this.player.updatePosition(delta);
        this.dboxHandler.updateDbox();
        this.gameLogic.completionCheck();
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

    interactionHandler(){
        if(this.player.inDialogue){return}
        if(!this.player.canMove){return}
        if(Phaser.Input.Keyboard.JustDown(this.enterKey) && !this.player.isMoving && !this.dboxHandler.isActive){
            this.npcGroup.getChildren().forEach(npc => {
                if(this.player.checkTile(this.player.facing, this) == npc.getTile(this)){
                    npc.sayMessage();
                    npc.facePlayer(this.player.facing);
                }
            });
            this.signGroup.getChildren().forEach(sign => {
                if(this.player.checkTile(this.player.facing, this) == sign.getTile(this) && this.player.facing == "up"){
                    sign.signMessage();
                }
            });
        }
        if(Phaser.Input.Keyboard.JustDown(this.cKey) && !this.player.isMoving && !this.dboxHandler.isActive){
            this.dboxHandler.showDbox([`Current Item:  ${this.currentItem.name} \nDescription:  ${this.currentItem.desc}`]);
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

    addDboxHandler(){
        this.dbox = this.add.image(0, 0, "dbox").setOrigin(0);
        this.dbox.depth = 14;
        this.dbox.setScrollFactor(0);
        this.dbox.setVisible(false);
        
        this.arrow = this.add.sprite(350, 280, "arrow");
        this.arrow.depth = 16;
        this.arrow.setScrollFactor(0);
        this.arrow.setVisible(false);
        this.arrow.anims.play("arrowAnim");

        this.dboxHandler = new dBox(this);
    }

    addItemHandler(){
        this.itemHandler = new ItemHandler(this);
        this.currentItem = this.itemHandler.getItem("noItem");

        this.itemBox = this.add.image(1, 1, "itemBox")
        .setOrigin(0)
        .setDepth(10)
        .setScrollFactor(0);

        this.itemDisplay = this.add.image(7,7, this.currentItem.imgKey)
        .setOrigin(0)
        .setDepth(11)
        .setScrollFactor(0);

        this.itemText = this.add.text(33, 2, this.currentItem.name, 
            { fontFamily: "monaco", color: '#000', fontSize: '16px'})
        .setDepth(11)
        .setScrollFactor(0);
    }

    addControlsBox(){
        this.controlsBox = this.add.image(390, 0, "controls").setOrigin(0);
        this.controlsBox.depth = 10;
        this.controlsBox.setScrollFactor(0);
        this.controlsBox.setInteractive();
        this.controlsBox.on('pointerover', () => {
            this.controlsBox.setX(264);
        });
        this.controlsBox.on('pointerout', () => {
            this.controlsBox.setX(390);
        });
    }

    addNPCs(){
        //NPCs
        this.landlordNPC = new NPC(this, this.calculateTilePos(12), this.calculateTilePos(9), "landlord", "landlord");
        this.farmerNPC = new NPC(this, this.calculateTilePos(41), this.calculateTilePos(14), "farmer", "farmer");
        this.timNPC = new NPC(this, this.calculateTilePos(28), this.calculateTilePos(34), "tim", "tim");
        this.teejNPC = new NPC(this, this.calculateTilePos(40), this.calculateTilePos(39), "teej", "teej");
        this.randomNPC1 = new NPC(this, this.calculateTilePos(9), this.calculateTilePos(41), "random1", "random1");
        this.randomNPC2 = new NPC(this, this.calculateTilePos(32), this.calculateTilePos(23), "random2", "random2");
        this.randomNPC3 = new NPC(this, this.calculateTilePos(7), this.calculateTilePos(31), "random3", "random3");

        //Signs
        this.homeSign = new NPC(this, this.calculateTilePos(9), this.calculateTilePos(8), "noItem", "homeSign");
        this.landlordSign = new NPC(this, this.calculateTilePos(30), this.calculateTilePos(32), "noItem", "landlordSign");
        this.farmerSign = new NPC(this, this.calculateTilePos(35), this.calculateTilePos(13), "noItem", "farmerSign");
        this.timSign = new NPC(this, this.calculateTilePos(33), this.calculateTilePos(40), "noItem", "timSign");
        this.teejSign = new NPC(this, this.calculateTilePos(12), this.calculateTilePos(30), "noItem", "teejSign");

        //Add to group
        this.npcGroup = this.add.group();
        this.npcGroup.addMultiple([this.landlordNPC, this.farmerNPC, this.timNPC, this.teejNPC, this.randomNPC1, this.randomNPC2, this.randomNPC3]);
        this.npcGroup.getChildren().forEach(npc => {npc.setOrigin(0.5, 0.63)});

        this.signGroup = this.add.group();
        this.signGroup.addMultiple([this.homeSign, this.landlordSign, this.farmerSign, this.timSign, this.teejSign]);
        this.signGroup.getChildren().forEach(sign => {sign.setAlpha(0)});
    }

    addGameLogic(){
        this.gameLogic = new Logic(this);
    }
}