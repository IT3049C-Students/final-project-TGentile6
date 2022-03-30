class movementPhysics{
    constructor(scene){
        this.scene = scene;
        this.player = scene.player;
        this.isMoving = false;
        this.speed = 16 * 4; //tile size * speed multiplier
        this.pixelsWalked = 0
    }

    movePlayer(direction){
        if(!this.isMoving){
            this.startMoving(direction);
            console.log("started moving")
        }
    }

    startMoving(direction){
        this.movementDirection = direction;
        this.pixelsWalked = 0;
        this.isMoving = true;
    }

    stopMoving(){
        this.isMoving = false;
    }

    update(delta){
        if(this.isMoving){
            this.updatePosition(delta);
        }
    }

    updatePosition(delta){
        const pixelsToWalkThisUpdate = this.pixelsToWalk(delta);
        if(this.willReachTile(pixelsToWalkThisUpdate)){
            this.moveSprite(this.scene.tileSize - this.pixelsWalked);
            this.stopMoving();
        }
        else{
            this.moveSprite(pixelsToWalkThisUpdate);

        }
        this.pixelsWalked += pixelsToWalkThisUpdate;

    }
    
    moveSprite(pixelsToWalk){
        const vector = this.getVector(this.movementDirection);
        const distance = vector.multiply(new Phaser.Math.Vector2(pixelsToWalk));
        console.log(distance.x + " " + distance.y)
        console.log(pixelsToWalk)
        this.scene.player.x += distance.x
        this.scene.player.y += distance.y
    }

    willReachTile(pixelsToWalk){
        console.log((this.pixelsWalked + pixelsToWalk >= this.scene.tileSize))
        return (this.pixelsWalked + pixelsToWalk >= this.scene.tileSize);
    }

    pixelsToWalk(delta){
        console.log(this.speed * (delta / 1000))
        return this.speed * (delta / 1000);
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

}