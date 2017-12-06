var config = {
    width: 800,
    height: 400,
    renderer: Phaser.AUTO
};

var game = new Phaser.Game(config);

game.state.add('boot', boot);
game.state.add('load', load);
game.state.add('play', play);

game.state.start('boot');