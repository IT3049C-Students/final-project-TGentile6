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
        var moveX = this.getDirectionX(direction);
        var moveY = this.getDirectionY(direction);
        var tile = scene.layer.getTileAtWorldXY(this.x + moveX, this.y + moveY, true);
        if(tile.index !== 2 && tile.index !== 1 && !scene.checkIfOccupiedTile(tile)){
            this.x += moveX;
            this.y += moveY;
            this.facing = direction;
        }
        else{
            this.facing = direction;
        }
    }

    checkTile(direction, scene){
        var checkX = this.getDirectionX(direction);
        var checkY = this.getDirectionY(direction);
        var tile = scene.layer.getTileAtWorldXY(this.x + checkX, this.y + checkY, true);
        return tile;
    }

    getDirectionX(direction){
        let Xvalue;
        switch (direction){
            case "up":
                Xvalue = 0;
                break;
            case "down":
                Xvalue = 0;
                break;
            case "left":
                Xvalue = -32;
                break;
            case "right":
                Xvalue = 32;
                break;
            default:
        }
        return Xvalue;
    }

    getDirectionY(direction){
        let Yvalue;
        switch (direction){
            case "up":
                Yvalue = -32;
                break;
            case "down":
                Yvalue = 32;
                break;
            case "left":
                Yvalue = 0;
                break;
            case "right":
                Yvalue = 0;
                break;
            default:
        }
        return Yvalue;
    }
}