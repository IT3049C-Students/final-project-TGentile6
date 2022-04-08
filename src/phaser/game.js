const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 300,
    debug: false,
    scale: {
        zoom: 4
    },
    backgroundColor: 0x000000,
    pixelArt: true,
    scene: [loadScene, mainScene],
    physics: {
        default: "arcade",
        arcade:{
            debug: false
        }
    }
}

window.onload = function(){
    var game = new Phaser.Game(config);
}
