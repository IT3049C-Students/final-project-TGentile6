class Logic{
    constructor(scene){
        this.scene = scene
        this.spokenLandlord = 0; //0 for never spoken, 1 for spoken to at least once, 2 for after given carrots.
        this.spokenFarmer = 0; //0 for never spoken, 1 for spoken to at least once, 2 for after given wristwatch.
        this.spokenTimElord = 0; //0 for never spoken, 1 for spoken to at least once, 2 for after given wristwatch.
        this.spokenLilTeej = 0; //0 for never spoken, 1 for spoken to at least once, 2 for after given wristwatch.
    }

    completionCheck(){
        if(this.scene.currentItem.state === "completion"){
            this.scene.player.canMove = false;
            this.scene.player.updateSpriteDirection("down");
            this.scene.currentItem = this.scene.itemHandler.getItem("noItem");

            this.scene.tweens.add({
                targets:  this.scene.blackScreen,
                alpha:   1,
                duration: 1500,
            });
            this.scene.tweens.add({
                targets:  this.scene.music,
                volume:   0,
                duration: 1500,
            });

            this.getMessage("completion");
        }
    }

    getMessage(npcName){
        if(npcName == "landlord"){
            if(this.scene.currentItem.imgKey == "carrot"){
                this.scene.dboxHandler.showDbox(["Landlord:  Wow! You actually managed to get those Fancy Carrots for me!",
                "Landlord:  Well, I am a man of my word, but I will be back next week and you better have your rent."], "completion");
                this.spokenLandlord = 2;

            }
            else{
                if(this.spokenLandlord === 0){
                    this.scene.dboxHandler.showDbox(["Landlord:  Listen, I'm aware this property isn't the greatest, but you still need to pay rent.",
                    "Landlord:  That said... I'm willing to overlook this for a few days if you can run an errand for me...",
                    "Landlord:  Farmer John won't sell me any of his Fancy Carrots, and I've been really craving them recently.",
                    "Landlord:  If you can bring me some of Farmer John's Fancy Carrots, I'll overlook your rent for another week."]);
                    this.spokenLandlord = 1;
                }
                else if(this.spokenLandlord === 1){
                    this.scene.dboxHandler.showDbox(["Landlord:  If you can bring me some of Farmer John's Fancy Carrots, I'll overlook your rent for another week."]);
                }
                else if(this.spokenLandlord === 2){
                    this.scene.dboxHandler.showDbox(["Landlord:  I am a man of my word, but I will be back next week and you better have your rent."]);
                }
            }
        }

        if(npcName == "farmer"){
            if(this.spokenFarmer === 0){
                this.scene.dboxHandler.showDbox(["Farmer John:  Well howdy there friend, What brings you to my farm on this fine day?",
                "Farmer John:  Looking for some of my Fancy Carrots eh? Unfortunately I'm running a little low to just be giving them to folks.",
                "Farmer John:  But I tell you what, I'm in desperate need of a new watch to keep the time out in the fields. I just happen to be too busy to go find myself a new one.",
                "Farmer John:  If you can bring me a trusty ole Wristwatch I'd be more than happy to trade you for some Fancy Carrots."]);
                this.spokenFarmer = 1;
            }
            else if(this.spokenFarmer === 1){
                this.scene.dboxHandler.showDbox(["Farmer John:  If you can bring me a trusty ole Wristwatch I'd be more than happy to trade you for some Fancy Carrots."]);
            }
            else if(this.spokenFarmer === 2){
                this.scene.dboxHandler.showDbox(["Farmer John:  Thanks for the watch sonny! Now I won't forget to feed the cows on time again."]);
            }
        }

        if(npcName == "completion"){
            this.scene.dboxHandler.showDbox(["Congratulations!", "You completed Fetch Quest!"]);
        }
    }

}