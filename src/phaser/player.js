class Player extends Phaser.GameObjects.Sprite{
    constructor(scene){
        super(scene, scene.calculateTilePos(11), scene.calculateTilePos(9), 'player');
        scene.add.existing(this);
        this.setOrigin(0.5, 0.63)
        this.depth = 3;
        this.facing = "down";
        this.canMove = true; //value to check if the player is currently allowed to move
        this.inDialogue = false; //value to check if the player is currently reading dialogue
        this.isMoving = false;
        this.pixelsWalked = 0;
        this.speed = scene.tileSize * 12; //Default: 4
        this.WalkAnimUp = 0; //used to alternate between Upwards Walk Animations
        this.WalkAnimDown = 0; //used to alternate between Downwards Walk Animations
        this.WalkAnimLeft = 0; //used to alternate between Left Walk Animations
        this.WalkAnimRight = 0; //used to alternate between Right Walk Animations
        this.lastMovement = "";
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

    moveTile(direction){
        if(this.isMoving){return};
        if(this.inDialogue){return};
        var moveX = this.getDirectionX(direction);
        var moveY = this.getDirectionY(direction);
        var tile = this.scene.collisionLayer.getTileAtWorldXY(this.x + moveX, this.y + moveY, true);
        if(tile.index !== 21002 && !this.scene.checkIfOccupiedTile(tile)){
            this.facing = direction;
            this.isMoving = true;
            this.pixelsWalked = 0;
            this.lastMovement = direction;
            this.playAnimation(this.facing);
        }
        else{
            this.facing = direction;
            this.updateSpriteDirection(this.facing);
            this.lastMovement = "";
        }
    }

    updatePosition(delta){
        if(this.isMoving){
            const pixelsToWalk = this.speed * (delta / 1000);
            if(this.willReachTile(pixelsToWalk)){ 
                this.moveSprite(this.scene.tileSize - this.pixelsWalked);
                this.isMoving = false;
                this.anims.stop();
                if(!this.continueWalking(this.facing)){
                    this.lastMovement = "";
                }
                this.updateSpriteDirection(this.facing);
            }
            else{
                this.moveSprite(pixelsToWalk)
            }
            this.pixelsWalked += pixelsToWalk;
            this.pixelsWalked %= this.scene.tileSize;
        }
        else{
            if(this.facing == this.lastMovement){
                this.moveTile(this.lastMovement);
            }
        }
    }

    moveSprite(pixelsToWalk){
        const vector = this.getVector(this.facing);
        this.x += pixelsToWalk * vector.x;
        this.y += pixelsToWalk * vector.y;
    }

    willReachTile(pixelsToWalk){
        return (this.pixelsWalked + pixelsToWalk >= this.scene.tileSize);
    }

    continueWalking(currentDirection){
        if(currentDirection == "up" && this.scene.wKey.isDown){
            return true;
        }
        if(currentDirection == "down" && this.scene.sKey.isDown){
            return true;
        }
        if(currentDirection == "left" && this.scene.aKey.isDown){
            return true;
        }
        if(currentDirection == "right" && this.scene.dKey.isDown){
            return true;
        }
        return false;
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
                if(this.WalkAnimDown == 0){
                    this.anims.play("playerWalkLeft1");
                    this.WalkAnimDown = 1;
                    break;
                }
                else{
                    this.anims.play("playerWalkLeft2");
                    this.WalkAnimDown = 0;
                    break;
                }
            case "right":
                if(this.WalkAnimDown == 0){
                    this.anims.play("playerWalkRight1");
                    this.WalkAnimDown = 1;
                    break;
                }
                else{
                    this.anims.play("playerWalkRight2");
                    this.WalkAnimDown = 0;
                    break;
                }
            default:
        }
    }
}