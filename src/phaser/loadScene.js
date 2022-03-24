class loadScene extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }
    preload(){}
    create(){
        this.add.text(config.width/2, config.height/2, "Loading Game...").setOrigin(0.5);
        //this.scene.start("playGame");

        this.debugKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(this.debugKey)){
            if(config.debug == false){
                config.debug = true;
                console.log("debug on");
            }
            else{
                config.debug = false;
                console.log("debug off");
            }
        }
        
    }

}