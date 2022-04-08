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
            default:
                return {name: "Error",
                imgKey: "noItem",
                desc: "You should not have this."
                }
        }
    }
}