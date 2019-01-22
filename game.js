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
    setInterval(function(){
      // Set Player Motion
      const player = _.chars.player;
      if (key === "player"){
        if (player.activeMotionKeys.length === 0) player.motion = "none";
        else player.motion = player.activeMotionKeys[0];
      }
      console.log(_.chars.player.motion);
      if (_.chars[key].motion === "left") _.chars[key].x--;
      else if (_.chars[key].motion === "right") _.chars[key].x++;
      else if (_.chars[key].motion === "top") _.chars[key].y--;
      else if (_.chars[key].motion === "down") _.chars[key].y++;
    },1000/_.chars[key].speed);
  }
}

Game.prototype.addKeyActions = function(){
  const player = this.chars.player;
  player.activeMotionKeys = [];
  const keyDown = (event) => {
    // Left
    if (event.keyCode === 37){
      if (player.activeMotionKeys[0] !== "left"){
        // Remove Clone
        for (i=0; i<player.activeMotionKeys.length; i++){
          if (player.activeMotionKeys[i] === "left") player.activeMotionKeys.splice(i,1);
        }
        // Add to Array
        player.activeMotionKeys.unshift("left");
      }
    }
    // Right
    else if (event.keyCode === 39){
      if (player.activeMotionKeys[0] !== "right"){
        // Remove Clone
        for (i=0; i<player.activeMotionKeys.length; i++){
          if (player.activeMotionKeys[i] === "right") player.activeMotionKeys.splice(i,1);
        }
        // Add to Array
        player.activeMotionKeys.unshift("right");
      }
    }
    console.log(player.activeMotionKeys);
  }
  const keyUp = (event) => {
    if (event.keyCode === 37){
      for (i=0; i<player.activeMotionKeys.length; i++){
        if (player.activeMotionKeys[i] === "left") player.activeMotionKeys.splice(i,1);
      }
    }
    else if (event.keyCode === 39){
      for (i=0; i<player.activeMotionKeys.length; i++){
        if (player.activeMotionKeys[i] === "right") player.activeMotionKeys.splice(i,1);
      }
    }
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



/*
Game.prototype.test = function(){
}
firstGame.test();
*/

console.log(firstGame);
