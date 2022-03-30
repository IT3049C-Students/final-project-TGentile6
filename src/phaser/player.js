class Player extends Phaser.GameObjects.Sprite{
    constructor(scene){
        super(scene, scene.calculateTilePos(8), scene.calculateTilePos(8), 'player');
        scene.add.existing(this);
        this.depth = 2;
        this.facing = "down";
        this.canMove = true; //value to check if the player is currently allowed to move
        this.inDialogue = false; //value to check if the player is currently reading dialogue
        this.isMoving = false;
        this.pixelsWalked = 0;
        this.speed = scene.tileSize * 5;
        this.WalkAnimUp = 0; //used to alternate between Upwards Walk Animations
        this.WalkAnimDown = 0; //used to alternate between Downwards Walk Animations
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

    checkTile(direction, scene){
        var checkX = this.getDirectionX(direction);
        var checkY = this.getDirectionY(direction);
        var tile = scene.collisionLayer.getTileAtWorldXY(this.x + checkX, this.y + checkY, true);
        return tile;
    }

    getDirectionX(direction){ //returns the X direction of a tile in the specified direction
        let Xvalue;
        switch (direction){
            case "up":
                Xvalue = 0;
                break;
            case "down":
                Xvalue = 0;
                break;
            case "left":
                Xvalue = -this.scene.tileSize;
                break;
            case "right":
                Xvalue = this.scene.tileSize;
                break;
            default:
        }
        return Xvalue;
    }

    getDirectionY(direction){ //returns the Y direction of a tile in the specified direction
        let Yvalue;
        switch (direction){
            case "up":
                Yvalue = -this.scene.tileSize;
                break;
            case "down":
                Yvalue = this.scene.tileSize;
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

    moveTile(direction, scene){
        if(this.isMoving){return}
        var moveX = this.getDirectionX(direction);
        var moveY = this.getDirectionY(direction);
        var tile = scene.collisionLayer.getTileAtWorldXY(this.x + moveX, this.y + moveY, true);
        if(tile.index !== 21002 && !scene.checkIfOccupiedTile(tile)){
            this.facing = direction;
            this.isMoving = true;
            this.pixelsWalked = 0;
            this.playAnimation(this.facing);
        }
        else{
            this.facing = direction;
            this.updateSpriteDirection(this.facing);
        }
    }

    updatePosition(delta){
        if(this.isMoving){
            const pixelsToWalk = this.speed * (delta / 1000);
            if(this.willReachTile(pixelsToWalk)){
                this.moveSprite(this.scene.tileSize - this.pixelsWalked);
                this.isMoving = false;
                this.anims.stop();
                this.updateSpriteDirection(this.facing);
            }
            else{
                this.moveSprite(pixelsToWalk)
            }
        }
    }

    moveSprite(pixelsToWalk){
        const vector = this.getVector(this.facing);
        this.x += pixelsToWalk * vector.x;
        this.y += pixelsToWalk * vector.y;
        this.pixelsWalked += pixelsToWalk;
    }

    willReachTile(pixelsToWalk){
        return (this.pixelsWalked + pixelsToWalk >= this.scene.tileSize);
    }

    getVector(direction){
        switch (direction){
            case "up":
                return Phaser.Math.Vector2.UP;
            case "down":
                return Phaser.Math.Vector2.DOWN;
            case "left":
                return Phaser.Math.Vector2.LEFT;
            case "right":
                return Phaser.Math.Vector2.RIGHT;
            default:
        }
    }

    playAnimation(direction){
        switch (direction){
            case "up":
                if(this.WalkAnimUp == 0){
                    this.anims.play("playerWalkUp1");
                    this.WalkAnimUp = 1;
                    break;
                }
                else{
                    this.anims.play("playerWalkUp2");
                    this.WalkAnimUp = 0;
                    break;
                }
            case "down":
                if(this.WalkAnimDown == 0){
                    this.anims.play("playerWalkDown1");
                    this.WalkAnimDown = 1;
                    break;
                }
                else{
                    this.anims.play("playerWalkDown2");
                    this.WalkAnimDown = 0;
                    break;
                }
            case "left":
                this.anims.play("playerWalkLeft");
                break;
            case "right":
                this.anims.play("playerWalkRight");
                break;
            default:
        }
    }
}