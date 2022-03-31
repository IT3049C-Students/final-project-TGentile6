class dBox{
    constructor(scene){
        this.scene = scene;
        this.isActive = false;
        this.text = this.scene.add.bitmapText(this.scene.dbox.x - 108, this.scene.dbox.y - 15, "pixelFont", "")
        this.text.depth = 9;
        this.text.setScrollFactor(0);
        this.text.setVisible(false);
    }

    showDbox(message){
        this.isActive = true;
        this.scene.dbox.alpha = 1;
        this.scene.player.canMove = false;
        this.scene.player.inDialogue = true;

        this.text.setText(message)
        this.text.setVisible(true);
    }

    updateDbox(){
        if(this.scene.player.inDialogue && Phaser.Input.Keyboard.JustDown(this.scene.enterKey)){
            this.hideDbox();
        }
    }

    hideDbox(){
        this.scene.dbox.alpha = 0;
        this.scene.player.canMove = true;
        this.scene.player.inDialogue = false;

        this.text.setVisible(false);
    }
}