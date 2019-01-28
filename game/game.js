// EMPTY GAME FUNCTION

function Game(){}



// SOME OF THE GAME PROTOTYPE METHODS

Game.prototype.getKeyByValue = function(object, value){
  return Object.keys(object).find(key => object[key] === value);
}

Game.prototype.loadBasics = function(){
  this.canvas = document.getElementById("space-invaders-canvas");
  this.context = this.canvas.getContext("2d");
  this.canvas = document.getElementById("space-invaders-canvas");
  this.canvas.width = 300;
  this.canvas.height = 300;
  this.defaultStyle = "black";
}

Game.prototype.startAllActions = function(){
  for (key in this.chars) this.chars[key].startRegularActions();
}
