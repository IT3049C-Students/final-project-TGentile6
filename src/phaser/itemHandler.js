class ItemHandler{
    constructor(scene){
        this.scene = scene;
    }

    updateItem(){
        this.scene.itemDisplay.setTexture(this.scene.currentItem.imgKey);
        this.scene.itemText.setText(this.scene.currentItem.name);
    }

    getItem(item){
        switch(item){
            case "carrot": 
                return {name: "Fancy Carrots",
                imgKey: "carrot",
                desc: "The delicious and sought after Fancy Carrots grown by Farmer John"
                }
            case "watch":
                return {name: "Wristwatch",
                imgKey: "carrot",
                desc: "A trusty Wristwatch great for always knowing the time."
                }
            case "mixtape":
                return {name: "MP3 Player",
                imgKey: "mixtape",
                desc: "An MP3 Player loaded with amateur tunes."
                }
            default:
                return {name: "No Item",
                imgKey: "noItem",
                desc: "You don't have any item currently."
                }
        }
    }
}