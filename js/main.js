alert("test");

var game = new Phaser.game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

/**
 * @desc Preload all the resources.
 */
function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');

    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

/**
 * @desc Create all the stuff needed for the game.
 */
function create() {
    game.add.sprite(0, 0, 'star');
}

/**
 * @desc Update the game and do the game process stuff.
 */
function update() {

}