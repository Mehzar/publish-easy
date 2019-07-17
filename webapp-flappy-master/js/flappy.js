// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(810, 400, Phaser.AUTO, 'game', stateActions);
var score=-2;
var labelScore;
var player;
var pipes = [];
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  game.load.image("easy","../assets/emporio small.png");
  game.load.image("ea","../assets/flappy_superman.png");
  game.load.image("fifa","../assets/flappy_frog.png");
  game.load.image("ifa","../assets/easy.png");
  game.load.image("pipeBlock", "../assets/pipe2-body.png");
  game.load.audio("score", "../assets/jumpsnd1.mp3");
  game.load.image("gamebck","../assets/game background.jpg")

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // set the background colour of the scene
    //game.stage.setBackgroundColor("gamebck");
    backgroundImage = game.add.sprite(0,0,"gamebck");
    backgroundImage.height = 400;
    backgroundImage.width = 810;
    game.add.text(20,20,"Easy");
    game.add.text(20,350,"Flaps!");


    game.input.onDown.add(clickHandler);



    game.input
    .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(playerJump);
    var pipeInterval = 2 * Phaser.Timer.SECOND;
    game.time.events.loop(pipeInterval, generatePipe);

    game.input
    .keyboard.addKey(Phaser.Keyboard.RIGHT)
    .onDown.add(moveRight);

    game.input
    .keyboard.addKey(Phaser.Keyboard.LEFT)
    .onDown.add(moveLeft);

    game.input
    .keyboard.addKey(Phaser.Keyboard.UP)
    .onDown.add(moveUp);

    game.input
    .keyboard.addKey(Phaser.Keyboard.DOWN)
    .onDown.add(moveDown);

    labelScore= game.add.text(0, 0, score.toString());
    player = game.add.sprite(50, 50, "easy");
    game.physics.arcade.enable(player);

    player.body.gravity.y = 350;
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
  game.physics.arcade.overlap(player, pipes, gameOver);
}

function gameOver(){
  registerScore(score);
  location.reload();
}

function addPipeBlock(x,y) {
  var block = game.add.sprite(x, y, "pipeBlock");
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -250;
}

function generatePipe() {
  var gapStart = game.rnd.integerInRange(1, 5);
  for(var count=0; count < 8; count = count + 1) {
    if(count != gapStart && count != gapStart + 1) {

    addPipeBlock(800, count * 50);
  }
  }
  changeScore();
}

function moveRight() {
  player.x = player.x + 10;
}

function moveLeft(){
  player.x = player.x - 10;
}

function moveUp() {
  player.y = player.y - 70;
}

function moveDown() {
  player.y = player.y + 10;
}

function playerJump() {
  player.body.velocity.y = -195;
  game.sound.play("score");
}

function clickHandler(event) {
  game.add.sprite(event.x, event.y, "ifa");
  game.sound.play("score");
}

function spaceHandler() {
  changeScore();
  game.sound.play("score");
}

function changeScore() {
  score = score + 1;
  labelScore.setText(score.toString());
}
