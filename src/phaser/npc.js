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
        if(this.name === "1"){
            this.scene.dboxHandler.showDbox(["Listen, I'm aware this property isn't the greatest, but you still need to pay rent.",
            "That said... I'm willing to overlook this for a few days if you can run an errand for me...",
            "Farmer John won't sell me any of his Fancy Carrots, and I've been really craving them recently.",
            "If you can bring me some of Farmer John's Fancy Carrots, I'll overlook your rent for another week."]);
        }
        if(this.name === "2"){
            this.scene.dboxHandler.showDbox(["howdy!", "Have some Carrots!"], "carrot");
        }
        if(this.name === "farmerSign"){
            this.scene.dboxHandler.showDbox(["Farmer John's house."]);
        }
        if(this.name === "homeSign"){
            this.scene.dboxHandler.showDbox(["Your house."]);
        }
    }
}