Game.prototype.loadLevel = function(levelNumber){

  this.currentLevel = levelNumber;

  eval("this.lvl_"+levelNumber+"()");

}
