window.onload = function(){
    var game = new Phaser.Game(config);
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload,
        create,
        update
    }
}

function preload(){}

function create(){}

function update(){}
