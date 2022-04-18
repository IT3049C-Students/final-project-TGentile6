class NPC extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, sprite, npcName){
        super(scene, x, y, sprite);
        scene.add.existing(this);
        this.name = npcName;
        this.depth = 2;
    }

    getTile(scene){
        var center = this.getCenter();
        var tile = scene.collisionLayer.getTileAtWorldXY(center.x, center.y, true);
        return tile;
    }

    facePlayer(playerDirection){
        switch (playerDirection){
            case "up":
                this.setFrame(0); //down for NPC
                break;
            case "down":
                this.setFrame(3); //up for NPC
                break;
            case "left":
                this.setFrame(1); //right for NPC
                break;
            case "right":
                this.setFrame(2); //left for NPC
                break;
        }
    }

    updateSpriteDirection(playerDirection){
        switch (playerDirection){
            case "up":
                this.setFrame(3);
                break;
            case "down":
                this.setFrame(0);
                break;
            case "left":
                this.setFrame(2);
                break;
            case "right":
                this.setFrame(1);
                break;
        }
    }

    sayMessage(){
        if(this.name === "landlord"){
            this.scene.gameLogic.getMessage(this.name);
        }
        if(this.name === "farmer"){
            this.scene.dboxHandler.showDbox(["howdy!", "Have some Carrots!"], "carrot");
        }
        
    }

    signMessage(){
        if(this.name === "farmerSign"){
            this.scene.dboxHandler.showDbox(["Farmer John's house."]);
        }
        if(this.name === "homeSign"){
            this.scene.dboxHandler.showDbox(["Your house."]);
        }
    }
}