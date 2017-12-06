/* Load.js */
var load = {
    preload : function() {
        console.log("Loading!");

        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('obstacle', 'assets/obstacle.png');
        game.load.atlas('player', 'assets/sprites/spriteatlas.png', 'assets/sprites/spriteatlas.json'); //Spriteatlas.    
    },

    create : function() {
        game.state.start('play');
    }
};