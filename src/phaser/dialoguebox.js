class dBox{
    constructor(scene){
        this.scene = scene;
        this.isActive = false;
        this.text = this.scene.add.text(47, 210, "", { fontFamily: "monaco", color: '#000', fontSize: '16px', wordWrap: { width: 310 }});
        this.text.depth = 10;
        this.text.setScrollFactor(0);
        this.text.setVisible(false);
        this.waitTime = 0;
        this.pages = 0;
        this.currentPage = 0;
        this.currentMessages = [""];
        this.giveItem = null;
    }

    displayMessage(messages){
        this.scene.arrow.setVisible(false);
        this.pages--;
        this.text.setText(messages[this.currentPage]);
        this.waitTime = 75;
    }

    showDbox(messages, item){
        this.isActive = true;
        this.pages = messages.length;
        this.currentPage = 0;
        this.currentMessages = messages;
        if(item){
            this.giveItem = item;
        }
        
        this.scene.dbox.setVisible(true);
        this.scene.player.canMove = false;
        this.scene.player.inDialogue = true;
        this.text.setText("");
        this.text.setVisible(true);

        this.displayMessage(this.currentMessages);
        
    }

    updateDbox(){
        if(this.scene.player.inDialogue && Phaser.Input.Keyboard.JustDown(this.scene.enterKey) && this.waitTime === 0){
            if(this.pages === 0){
                this.hideDbox();
            }
            else{
                this.currentPage++;
                this.displayMessage(this.currentMessages)
            }
        }
        if(this.isActive){
            if(this.waitTime > 0){
                this.waitTime--;
            }
            if(this.scene.arrow.visible === false && this.waitTime === 0){
                this.scene.arrow.setVisible(true);
            }
        }
        
    }

    hideDbox(){
        if(this.giveItem != null){
            console.log(`giving item ${this.giveItem}`)
            this.scene.currentItem = this.scene.itemHandler.getItem(this.giveItem);
            this.scene.itemHandler.updateItem();
        }
        this.giveItem = null;
        this.isActive = false;
        this.scene.dbox.setVisible(false);
        this.scene.arrow.setVisible(false);
        this.scene.player.canMove = true;
        this.scene.player.inDialogue = false;

        this.text.setVisible(false);
    }
}