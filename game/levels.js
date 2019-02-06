Game.prototype.addPlayer = function(x, y){
  const freeKey = this.findFreeKeyInObj("player", this.chars);
  this.chars[freeKey] = this.createReal("player", x, y);
}

Game.prototype.loadLevel1 = function(){
  // Elements
  this.addPlayer(50, 50);
  
  // Start game loop
  this.startGameLoop();
}

Game.prototype.loadLevel = function(number){
  const thisGame = this;
  function Real (template, x, y){
    // copy all properties
    for (key in thisGame.templates[template]){
      this[key] = thisGame.templates[template][key];
    }
    // set position
    this.x = x;
    this.y = y;
  }
  this.createReal = function(template, x, y){
    return new Real(template, x, y);
  }
  this.chars = {};
  this.projectiles = {};
  this.loadLevel1();
}
