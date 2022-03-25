class NPC extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, sprite, npcName){
        super(scene, x, y, sprite);
        scene.add.existing(this);
        this.name = npcName;
        this.doorOpen = false;
    }

    getTile(scene){
        var center = this.getCenter();
        var tile = scene.layer.getTileAtWorldXY(center.x, center.y, true);
        return tile;
    }

    updateSpriteDirection(playerDirection){
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

    sayMessage(scene){
        if(this.name === "1"){
            console.log("hello!");

        }
        if(this.name === "2"){
            if(this.doorOpen){
                console.log("the door is open.")
            }
            else{
                console.log("I opened the door for you!");

                scene.map.replaceByIndex(1, 0);
                this.doorOpen = true;
            }
        }
    }
}