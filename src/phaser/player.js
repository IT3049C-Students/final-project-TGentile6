class Player extends Phaser.GameObjects.Sprite{
    constructor(scene){
        super(scene, 32+16, 32+16, 'player');
        scene.add.existing(this);
        this.facing = "down";
    }

    getPlayerTile(){
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
                this.setFrame(1);
                break;
            case "right":
                this.setFrame(2);
                break;
        }
    }

    moveTileCheck(direction, layer){
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

        var tile = layer.getTileAtWorldXY(this.x + moveX, this.y + moveY, true);
        if(tile.index !== 2 ){
            this.x += moveX;
            this.y += moveY;
            this.facing = direction;
        }
        else{
            this.facing = direction;
        }
    }
}