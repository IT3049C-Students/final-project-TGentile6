const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    debug: false,
    backgroundColor: 0xFFFFFF,
    pixelArt: true,
    scene: [loadScene, mainScene],
}

window.onload = function(){
    var game = new Phaser.Game(config);
}
