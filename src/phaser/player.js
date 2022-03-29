class Player extends Phaser.GameObjects.Sprite{
    constructor(scene){
        super(scene, scene.calculateTilePos(1), scene.calculateTilePos(1), 'player');
        scene.add.existing(this);
        this.facing = "down";
    }

    getPosition(){
        return this.getCenter();
    }

    getFacing(){
        return this.facing;
    }

    updateSpriteDirection(direction){
        switch (direction){
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

    moveTile(direction, scene){
        var moveX;
        var moveY;
        switch (direction){
            case "up":
                moveX = 0;
                moveY = -32;
                break;
            case "down":
                moveX = 0;
                moveY = 32;
                break;
            case "left":
                moveX = -32;
                moveY = 0;
                break;
            case "right":
                moveX = 32;
                moveY = 0;
                break;
            default:
        }
        var tile = scene.layer.getTileAtWorldXY(this.x + moveX, this.y + moveY, true);
        if(tile.index !== 2 && tile.index !== 1 && tile !== scene.npc.getTile(scene) && tile !== scene.npc2.getTile(scene)){ //Create boolean function to replace individual NPC checks (true if no NPCs on tile)
            this.x += moveX;
            this.y += moveY;
            this.facing = direction;
        }
        else{
            this.facing = direction;
        }
    }

    checkTile(direction, scene){
        var checkX;
        var checkY;
        switch (direction){
            case "up":
                checkX = 0;
                checkY = -32;
                break;
            case "down":
                checkX = 0;
                checkY = 32;
                break;
            case "left":
                checkX = -32;
                checkY = 0;
                break;
            case "right":
                checkX = 32;
                checkY = 0;
                break;
            default:
        }
        var tile = scene.layer.getTileAtWorldXY(this.x + checkX, this.y + checkY, true);
        return tile;
    }
}