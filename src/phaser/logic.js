class Logic{
    constructor(scene){
        this.scene = scene
        this.spokenLandlord = 0; //0 for never spoken, 1 for spoken to at least once, 2 for after given carrots.
        this.spokenFarmer = 0; //0 for never spoken, 1 for spoken to at least once, 2 for after given wristwatch.
        this.spokenTim = 0; //0 for never spoken, 1 for spoken to at least once, 2 for after given mp3.
        this.spokenTeej = 0; //0 for never spoken, 1 for spoken to at least once, 2 for after Tim is given mp3.
    }

    startGame(){
        this.scene.player.updateSpriteDirection("right");
        this.scene.landlordNPC.facePlayer("right");
        this.getMessage("landlord");
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
        //Landlord
        if(npcName == "landlord"){
            //When wanted item is in hand
            if(this.scene.currentItem.imgKey == "carrot" && this.spokenLandlord != 0){
                this.scene.dboxHandler.showDbox(["Landlord:  Well I'll be, you actually managed to get those Fancy Carrots for me!",
                "Landlord:  I am a man of my word, but I will be back next week and you better have your rent."], "completion");
                this.spokenLandlord = 2;
            }

            //Without wanted item
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

        //Farmer John
        if(npcName == "farmer"){
            //When wanted item is in hand
            if(this.scene.currentItem.imgKey == "watch" && this.spokenFarmer != 0){
                this.scene.dboxHandler.showDbox(["Farmer John:  Oh? This Wristwatch is for me?",
                "Farmer John:  Here you go partner, some Fancy Carrots as payment for bringing me this mighty fine Wristwatch!"], "carrot");
                this.spokenFarmer = 2;
            }

            //Without wanted item
            else{
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
        }

        //Tim E. Keeper
        if(npcName == "tim"){
            //When wanted item is in hand
            if(this.scene.currentItem.imgKey == "mixtape" && this.spokenTim != 0){
                this.scene.dboxHandler.showDbox(["Tim E. Keeper:  " + this.getDateString(),
                "Tim E. Keeper:  Oh! is that MP3 player for me? Thank you so much, this is going to make standing here much less boring!",
                "Tim E. Keeper:  As promised, here is your Wristwatch so that you can keep the time all by yourself."], "watch");
                this.spokenTim = 2;
                this.spokenTeej = 2;
            }

            //Without wanted item
            else{
                if(this.spokenTim === 0){
                    this.scene.dboxHandler.showDbox(["Tim E. Keeper:  " + this.getDateString(),
                    "Tim E. Keeper:  Oh hello there, I'm Tim E. Keeper. Since we don't have a clock tower in this town, I have taken it upon myself to make the time known to all.",
                    "Tim E. Keeper:  It sure does get boring though...",
                    "Tim E. Keeper:  Say, If you happen to find anything that would help me pass the time could you maybe lend it to me?",
                    "Tim E. Keeper:  I would be willing to exchange it for a Wristwatch, perfect tool for keeping the time anywhere."]);
                    this.spokenTim = 1;
                }
                else if(this.spokenTim === 1){
                    this.scene.dboxHandler.showDbox(["Tim E. Keeper:  " + this.getDateString(),
                        "Tim E. Keeper:  Hello again, I would still be willing to exchange this Wristwatch for something to help pass the time."]);
                }
                else if(this.spokenTim === 2){
                    this.scene.dboxHandler.showDbox(["Tim E. Keeper:  " + this.getDateString(),
                    "Tim E. Keeper:  Thanks for the MP3! It's certainly been helping pass the time... Although the music is a bit odd..."]);
                }
            }
        }

        //Lil Teej
        if(npcName == "teej"){
            if(this.spokenTeej === 0){
                this.scene.dboxHandler.showDbox(["Lil Teej:  Yo yo, The name's Lil Teej.",
                "Lil Teej:  I'm trying to get my music career off the ground but things aren't going so hot.",
                "Lil Teej:  So guess what, here's a once in a lifetime deal, I give you this MP3 player with my music, and you tell the world how amazing it is.",
                "Lil Teej:  Here you go, make sure not to lose it."], "mixtape");
                this.spokenTeej = 1;
            }
            else if(this.spokenTeej === 1){
                this.scene.dboxHandler.showDbox(["Lil Teej:  How's the music? Ah who am I kidding, I know its amazing."]);
            }
            else if(this.spokenTeej === 2){
                this.scene.dboxHandler.showDbox(["Lil Teej:  How's the mus- Wait what happened to your mp3 player?",
                "Lil Teej:  You traded it!? ...Well I guess as long as someone's listening to it..."]);
            }
        }

        if(npcName == "completion"){
            this.scene.dboxHandler.showDbox(["Congratulations!", "You completed Fetch Quest!"]);
        }

        //Random NPCs
        if(npcName == "random1"){
            this.scene.dboxHandler.showDbox(["Hunter:  I heard Lil Teej is giving out MP3 players with his music again... how does he get his hands on that many MP3 players?"]);
        }
        if(npcName == "random2"){
            this.scene.dboxHandler.showDbox(["Olivia:  Have you ever noticed that Tim never checks his watch for the time? Does he just keep track of it in his head?"]);
        }
        if(npcName == "random3"){
            this.scene.dboxHandler.showDbox(["Christina:  Man I wish Farmer John would give me some of his Fancy Carrots... He's being so stingy after this year's small harvest!"]);
        }
    }

    getDateString(){
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let Today = new Date();
        let Day = weekdays[Today.getDay()];
        let Hour = Today.getHours();
        let Min = Today.getMinutes();
        let leadingZero = "";
        if(Min < 10){leadingZero = "0"}
        
        return `It is currently ${Hour}:${leadingZero}${Min} on ${Day}.`
    }

}