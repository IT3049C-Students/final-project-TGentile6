const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    debug: false,
    backgroundColor: 0x000000,
    scene: [loadScene],
}

window.onload = function(){
    var game = new Phaser.Game(config);
}
