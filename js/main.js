var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

/**
 * @desc Preload all the resources.
 */
function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');

    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

var platforms;
var player;
var cursors;
var stars;
var score = 0;
var scoreText = "";

/**
 * @desc Create all the stuff needed for the game.
 */
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE); //Arcade Physics.
    
    game.add.sprite(0, 0, 'sky');

    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    player = game.add.sprite(32, game.world.height - 150, 'dude');
    console.log(player);
    game.physics.arcade.enable(player);    
    player.body.bounce.y = 0;
    player.body.gravity.y = 600;
    player.body.collideWorldBounds = true;

    stars = game.add.group();
    stars.enableBody = true;

    for (var starPos = 0; starPos < 12; starPos++) {
        var star = stars.create(starPos * 70, 0, 'star');
        star.body.gravity.y = 600;
        star.body.bounce.y = .7 + Math.random() * .2;
    }

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    cursors = game.input.keyboard.addKeys({ 'up' : Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left' : Phaser.KeyCode.A, 'right' : Phaser.KeyCode.D });    
    //cursors = game.input.keyboard.createCursorKeys();

    scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000'});
}

/**
 * @desc Update the game and do the game process stuff.
 */
function update() {
    var playerPlatform = game.physics.arcade.collide(player, platforms);
    var starPlatform = game.physics.arcade.collide(stars, platforms);
    var starPlayer = game.physics.arcade.collide(player, stars, collectStar, null, this);

    player.body.velocity.x = 0;
    
        if (cursors.left.isDown) {
            player.body.velocity.x = -300;
    
            player.animations.play('left');
        }

        else if (cursors.right.isDown) {
            player.body.velocity.x = 300;
    
            player.animations.play('right');
        }
        
        else {
            player.animations.stop();
    
            player.frame = 4;
        }
    
        if (cursors.up.isDown && player.body.touching.down && playerPlatform) {
            player.body.velocity.y = -450;
        }
}

/**
 * @desc Collect the star! Do it! 
 */
function collectStar (player, star) {
    star.kill();
    scoreText.text = 'Score: ' + (score += 10);
}