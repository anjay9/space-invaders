// EMPTY GAME FUNCTION

function Game(){}



// SOME OF THE GAME PROTOTYPE METHODS

Game.prototype.getKeyByValue = function(object, value){
  return Object.keys(object).find(key => object[key] === value);
}

Game.prototype.getRandomIntegerBetween = function(min, max){
  return Math.floor(Math.random() * max - min) + min;
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

Game.prototype.findFreeKeyInObj = function(passedString){
  let found = false;
  let number = 0;
  const keyAlreadyExist = (keyProposition) => {
    for (key in this.projectiles){
      if (key === keyProposition) return true;
    }
    return false;
  }
  while (found === false){
    if (number > 1000) alert("Trying to assign a projectile to the key with number that is larger than 1000.");
    const keyProposition = passedString + "Proj" + number;
    if (keyAlreadyExist(keyProposition) === false){
      found = true;
      return keyProposition;
    }
    number++;
  }
}

Game.prototype.spawnProjectile = function(charKey, xProjPos, yProjPos, projTemplate, projDirection){
  const freeProjKey = this.findFreeKeyInObj(charKey + "Proj");
  this.projectiles[freeProjKey] = this.createGameElem("projectile", projTemplate, xProjPos, yProjPos);
  this.projectiles[freeProjKey].motion = projDirection;
  this.projectiles[freeProjKey].startRegularActions();
}
