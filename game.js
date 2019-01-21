/*function Game() {
  this.this =

  setup();
  const setup = () => {
    const that = this;
    const canvas = document.getElementById("space-invaders-canvas");
    const context = cavas.getContext("2d");
    const tileSize = 30;
    const gridSize = 10;
    canvas.width = tileSize * gridSize;
    canvas.height = tileSize * gridSize;
  }

  const setup = {

    canvas.width

    tileSize: 30,
    gridSize: 10
  }
  canvas.width = tileSize * gridSize;
  canvas.height = tileSize * gridSize;

  const chars = {};

  // ------------------------------------------------------

  function Char(style, x, y){
    this.style = style;
    this.x = x;
    this.y = y;
    this.motion = 'none';
  }

  prototype.Char.draw = function(){
    ctx.fillStyle = this.style;
    ctx.fillRect(x, y, tileSize, tileSize);
  }

  chars.mainChar = new Char('green', 100, 250);

  // ----------------------------------------------------------

  const drawCanvas = () => {
    ctx.fillStyle = canvasColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  const drawMainChar = () => {
    ctx.fillStyle = mainChar.styleColor;
    ctx.fillRect(mainChar.x, mainChar.y, tileSize, tileSize);
  }

  const loadPosition = (mainChar) => {
    if (mainChar === 'left') mainChar.x--;
    else if (mainChar === 'right') mainChar.x++;
  }

  setInterval(function(){
    drawCanvas();
  }, 1000/60);

  setInterval(function(){
    loadMainCharPosition();
  }, 1000/10);

  const keyPush = (event) => {
    if (event.keyCode === 37) mainChar.motion = "left";
    else if (event.keyCode === 39) mainChar.motion = "right";
  }

  document.addEventListener("keydown", function(){keyPush(event)});

}
*/

function Game(){}

Game.prototype.loadBasics = function(){
  this.canvas = document.getElementById("space-invaders-canvas");
  this.context = this.canvas.getContext("2d");
  this.tileSize = 30;
  this.gridSize = 10;
  this.canvas = document.getElementById("space-invaders-canvas");
  this.canvas.width = this.tileSize * this.gridSize;
  this.canvas.height = this.tileSize * this.gridSize;
  this.defaultStyle = "black";
}

Game.prototype.loadTemplates = function(){
  function CharTemplate(style, speed) {
    this.style = style;
    this.speed = speed;
  }
  this.charTemplates = {
    player: new CharTemplate("green", 1),
    weakEnemy: new CharTemplate("purple", 0.5),
    mediumEnemy: new CharTemplate("teal", 1),
    strongEnemy: new CharTemplate("maroon", 1.5)
  }
}

Game.prototype.loadLevel = function(levelNumber){
  const _ = this;
  function Char(template, x, y){
    for (key in _.charTemplates[template]){
      this[key] = _.charTemplates[template][key];
    }
    this.x = x;
    this.y = y;
  }
  // Level 0
  if (levelNumber === 0){
    this.chars = {
      player: new Char("player", 300/2-30/2, 240)
    }
  }
  // Level 1
  else if (levelNumber === 1){

  }
  // Level 2
  else if (levelNumber === 2){

  }
}

Game.prototype.startDrawing = function(frames){
  const _ = this;
  setInterval(function(){
    // Canvas
    _.context.fillStyle = _.defaultStyle;
    _.context.fillRect(0, 0, _.canvas.width, _.canvas.height);
    // Characters
    for (key in _.chars){
      _.context.fillStyle = _.chars[key].style;
      _.context.fillRect(_.chars[key].x, _.chars[key].y, _.tileSize, _.tileSize);
    }
  },1000/frames);
}

const firstGame = new Game();
window.onload = firstGame;
firstGame.loadBasics();
firstGame.loadTemplates();
firstGame.loadLevel(0);

firstGame.start
firstGame.startDrawing(60);

console.log(firstGame);
