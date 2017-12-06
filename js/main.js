var game = new Phaser.Game(800, 400, Phaser.AUTO, '', { boot: boot, preload: preload, create: create, update: update });

/**
 * @desc Loading screen.
 */
function boot() {
    
}

/**
 * @desc Preload all the resources.
 */
function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');

    game.load.atlas('player', 'assets/sprites/spriteatlas.png', 'assets/sprites/spriteatlas.json'); //Spriteatlas.
}

var platforms;
var player;

/**
 * @desc Create all the stuff needed for the game.
 */
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE); //Arcade Physics.
    game.input.onTap.add(onTap, this);
    
    /* Sprites for backgrounds */
    game.add.sprite(0, 0, 'sky');

    /* Platform group */
    platforms = game.add.group();
    platforms.enableBody = true;

    /* Obstacle group */
    //obstacles = game.add.group();

    /* Ground stuff */
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 1.5);
    ground.body.immovable = true;

    /* Player stuff */
    player = game.add.sprite(32, game.world.height - 400, 'player');
    player.scale.setTo(2/8, 2/8);

    game.physics.arcade.enable(player);
    
    player.body.enable = true;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    
    player.body.setSize(260, 400, 100, 40); //Correc tsize.

    player.animations.add('death', Phaser.Animation.generateFrameNames('Death (', 1, 30, ")"), 0, false);
    player.animations.add('jump', Phaser.Animation.generateFrameNames('Jump (', 1, 30, ")"), 0, false);
    
    player.animations.add('idle', Phaser.Animation.generateFrameNames('Idle (', 1, 16, ")"), 0, true);
    player.animations.add('run', Phaser.Animation.generateFrameNames('Run (', 1, 20, ")"), 0, true);
    player.animations.add('walk', Phaser.Animation.generateFrameNames('Walk (', 1, 20, ")"), 0, true);

    player.animations.play('run', 60); //Play starting off.

    /* Score */
    //scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000'});
}

/**
 * @desc Update the game and do the game process stuff.
 */
function update() {

    var playerGround = game.physics.arcade.collide(player, platforms);
}

/**
 * @desc OnTap event.
 * @param {pointer} pointer 
 * @param {bool} doubleTap 
 */
function onTap(pointer, doubleTap) {
    player.animations.play('jump', 30);
    player.body.velocity.y -= 200;

    player.animations.currentAnim.onComplete.add(function () {
        player.animations.play('run', 60);
    });
}

/**
 * @desc Add obstacle.
 */
function addObstacle(x, y) {
    var obstacle = game.add.sprite(x, y, 'obstacle')
    
    obstacles.add(obstacle);
    game.physics.arcade.enable(obstacle);
    
    obstacle.body.velocity.x = -200;
    
    obstacle.checkWorldBounds = true;
    obstacle.outOfBoundsKill = true;
}