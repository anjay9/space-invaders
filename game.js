function Game(){}

Game.prototype.getKeyByValue = function(object, value){
  return Object.keys(object).find(key => object[key] === value);
}

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
    this.motion = "none";

  }
  this.charTemplates = {
    player: new CharTemplate("green", 200),
    weakEnemy: new CharTemplate("purple", 50),
    mediumEnemy: new CharTemplate("teal", 100),
    strongEnemy: new CharTemplate("maroon", 150)
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
      player: new Char("player", 300/2-30/2, 240),
      enemy_0: new Char("weakEnemy", 100, 100),
      enemy_1: new Char("weakEnemy", 150, 100)
    }
  }
  // Level 1
  else if (levelNumber === 1){

  }
  // Level 2
  else if (levelNumber === 2){

  }
}

Game.prototype.startDrawing = function(fps){
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
  },1000/fps);
}

Game.prototype.startExecutingActions = function(){
  const _ = this;
  // Characters
  for (key in _.chars){
    const char = _.chars[key];
    const executeActions = () => {
      // Set Player Motion
      if (_.getKeyByValue(_.chars, char) === "player"){
        const player = _.chars.player;
        if (player.activeMotionKeys.length === 0) player.motion = "none";
        else player.motion = player.activeMotionKeys[0];
      }
      // Execute Motions
      if (char.motion === "left") char.x--;
      else if (char.motion === "right") char.x++;
      else if (char.motion === "top") char.y--;
      else if (char.motion === "down") char.y++;
    }
    setInterval(function(){executeActions()},1000/_.chars[key].speed);
  }

}

Game.prototype.addKeyActions = function(){
  const player = this.chars.player;
  player.activeMotionKeys = [];
  const keyDown = (event) => {
    // Function declarations
    const removeClones = (value) => {
      for (i=0; i<player.activeMotionKeys.length; i++){
        if (player.activeMotionKeys[i] === value) player.activeMotionKeys.splice(i,1);
      }
    }
    const addToArray = (value) => player.activeMotionKeys.unshift(value)
    // Left
    if (event.keyCode === 37){
      if (player.activeMotionKeys[0] !== "left"){
        removeClones("left");
        addToArray("left");
      }
    }
    // Right
    else if (event.keyCode === 39){
      if (player.activeMotionKeys[0] !== "right"){
        removeClones("right");
        addToArray("right");
      }
    }
  }
  const keyUp = (event) => {
    // Function declarations
    const removeActiveKeys = (value) => {
      for (i=0; i<player.activeMotionKeys.length; i++){
        if (player.activeMotionKeys[i] === value) player.activeMotionKeys.splice(i,1);
      }
    }
    // Left
    if (event.keyCode === 37) removeActiveKeys("left");
    // Right
    else if (event.keyCode === 39) removeActiveKeys("right");
  }
  document.addEventListener("keydown", function(){keyDown(event)} );
  document.addEventListener("keyup", function(){keyUp(event)} );
}

const firstGame = new Game();

window.onload = firstGame;

firstGame.loadBasics();
firstGame.loadTemplates();
firstGame.loadLevel(0);

firstGame.addKeyActions();
firstGame.startExecutingActions();
firstGame.startDrawing(60);

console.log(firstGame);
