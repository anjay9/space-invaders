Game.prototype.loadTemplates = function(){

  this.chars = {};
  this.projectiles = {};

  const _ = this;

  // TEMPLATE FUNCTION
  function Template(fraction, style, width, height, speed){
    this.fraction = fraction;
    this.style = style;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.motion = "none";
  }

  // TEMPLATE PROTOTYPE - UNREGULAR ACTIONS
  Template.prototype.startRegularActions = function(){
    if (typeof this.regularActions === "function"){
      this.speedInterval = setInterval(function(){ this.regularActions() }.bind(this) ,1000/this.speed);
    }
    else{
      console.log(this);
      console.log("^ The element above doesnt contain the regularActions funciton.");
    }
  }
  Template.prototype.shoot = function(template, direction){
    if (this.type === "char") this.projectileSpawner();
    else alert("Game element that isn't a char is trying to shoot.");
  }
  Template.prototype.startActionsDependentOnLevel = function(){
    if (this.actionsDependentOnLevel instanceof Function) this.actionsDependentOnLevel();
  }

  // TEMPlATE PROTOTYPE - REGULAR ACTIONS
  Template.prototype.executeMotion = function(){
    if (this.motion === "left") this.x--;
    else if (this.motion === "right") this.x++;
    else if (this.motion === "top") this.y--;
    else if (this.motion === "down") this.y++;
  }
  Template.prototype.activeKeyToMotion = function(){
    if (this.activeMotionKeys.length === 0) this.motion = "none";
    else this.motion = this.activeMotionKeys[0];
  }
  Template.prototype.isProjHittingChar = function(){
    const setDiffTypeContainer = (type) => {
      if (type === "char") return _.projects;
      else if (type === "projectile") return _.chars;
    }
    const diffTypeContainer = setDiffTypeContainer(this.type);
    for (const diffTypeKey in diffTypeContainer){
      const diffTypeElem = diffTypeContainer[diffTypeKey];
      // Projectiles doesnt kill characters from the same fraction.
      if (this.fraction !== diffTypeElem.fraction){
        // Projectile isn't touching the character from the perspective of one axle - Return True
        // Otherwise - Return False
        const hitFromPerspectiveOfOneAxle = (axle, obj1, obj2) => {
          const isLarger = (largerValue, smallerValue) => {
            if (largerValue > smallerValue) return true;
            else return false;
          }
          if (isLarger(obj1[axle], obj2[axle]) === isLarger(obj1[axle], obj2[axle] + obj2.width)
          === isLarger(obj1[axle] + obj1.width, obj2[axle]) === isLarger(obj1[axle] + obj1.width, obj2[axle])) return false;
          else return true;
        }
        // Check if the character is hit from the perspective of both axes
        if (hitFromPerspectiveOfOneAxle("x", this, diffTypeElem) && hitFromPerspectiveOfOneAxle("y", this, diffTypeElem)){
          // Return keys for both of the collided elements
          const thisContainer = () => {
            if (this.type === "char") return _.chars;
            else if (this.type === "projectile") return _.projectiles;
          }
          return {[this.type+"Key"]: _.getKeyByValue(thisContainer(), this),
          [diffTypeElem.type+"Key"]: diffTypeKey};
        }
      }
    }
    // If no projectiles collided with chars then return "none"
    return "none";
  }
  Template.prototype.checkCollision = function(){
    const collidedElems = this.isProjHittingChar();
    if (collidedElems !== "none"){
      clearInterval(_.projectiles[collidedElems.projectileKey].speedInterval);
      delete _.projectiles[collidedElems.projectileKey];
      delete _.chars[collidedElems.charKey];
    }
  }

  // CREATING TEMPLATE OBJECTS
  this.templates = {
    char:{
      player: new Template("player", "limegreen", 30, 30, 200),
      weakEnemy: new Template("enemy", "coral", 30, 30, 50),
      mediumEnemy: new Template("enemy", "teal", 30, 30, 100),
      strongEnemy: new Template("enemy", "maroon", 30, 30, 100, 150)
    },
    projectile:{
      playerInitialMissle: new Template("player", "lime", 5, 5, 125),
      weakEnemyMissle: new Template("enemy", "fuchsia", 5, 5, 200)
    }
  }

  // TEMPLATE OBJECTS - REGULAR ACTIONS
  this.templates.char.player.regularActions = function(){
    this.activeKeyToMotion();
    this.executeMotion();
    this.startActionsDependentOnLevel();
    this.checkCollision();
  }
  this.templates.char.weakEnemy.regularActions = function(){
    this.executeMotion();
    this.startActionsDependentOnLevel();
    this.checkCollision();
  }

  // GAME ELEMENT
  function GameElem(type, template, x, y){
    this.type = type;
    // Copy each element property
    for (key in _.templates[type][template]) this[key] = _.templates[type][template][key];
    // Set position
    this.x = x;
    this.y = y;
  }

  // GAME PROTOTYPE METHOD FOR CREATING GAME ELEMENT
  Game.prototype.createGameElem = function(type, template, x, y){
    return new GameElem(type, template, x, y);
  }

}
