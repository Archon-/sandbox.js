//window.onload = function() {

    var game = new Phaser.Game(480, 800, Phaser.AUTO, '', { preload: preload, create: create, update: update });

    var background;

    function preload () {
       game.load.image('background', 'background.jpg');
       console.log('preloaded');
    }

    function create () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        background = game.add.tileSprite(0, 0, 480, 800, 'background');
        console.log('created');
    }

    function update () {
        if (Math.floor(Math.random()*6) % 5 === 0) {
            background.tilePosition.y += 1;
        }
        // console.log('update');
    }

//};