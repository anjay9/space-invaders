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
  Template.prototype.disapearIfOutsideOfCanvas = function(){
    // If the element is totally outside of the canvas then delete it
    if (this.y + this.height <= 0 || this.y >= _.canvas.height
    || this.x + this.width <= 0 || this.x >= _.canvas.width){
      const thisContainer = function(){
        if (this.type === "char") return _.chars;
        else if (this.type === "projectile") return _.projectiles;
      }.bind(this);
      const thisKey = _.getKeyByValue(thisContainer(), this);
      delete thisContainer()[thisKey];
    }
  }
  Template.prototype.checkAutoShoot = function(){
    this.autoShootLoopsLeft--;
    if (this.autoShootLoopsLeft <= 0){
      this.shoot();
      this.autoShootLoopsLeft = _.getRandomIntegerBetween(this.autoShootLoopsLeftMin, this.autoShootLoopsLeftMax);
    }
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
  Template.prototype.shoot = function(){
    if (_.getKeyByValue(_.chars, this) !== undefined){
      if (this.hasOwnProperty("projectileSpawner")) this.projectileSpawner();
      else alert("Game element that doesn'have a projectileSprawner is trying to shoot.");
    }
  }
  Template.prototype.startActionsDependentOnLevel = function(){
    if (this.actionsDependentOnLevel instanceof Function) this.actionsDependentOnLevel();
  }


  // CREATING TEMPLATE OBJECTS
  this.templates = {
    char:{
      player: new Template("player", "limegreen", 30, 30, 50),
      weakEnemy: new Template("enemy", "coral", 30, 30, 50),
      mediumEnemy: new Template("enemy", "teal", 30, 30, 100),
      strongEnemy: new Template("enemy", "maroon", 30, 30, 100, 150)
    },
    projectile:{
      playerInitialMissle: new Template("player", "lime", 5, 5, 125),
      weakEnemyMissle: new Template("enemy", "fuchsia", 5, 5, 60)
    }
  }

  // TEMPLATE OBJECTS - REGULAR ACTIONS & PROPERTIES EXCLUSIVE FOR CERTAIN ELEMS

  // Player
  // Level-Dependent Properties
  this.templates.char.player.projectileSpawner = function(){
    const xProjPos = this.x + this.width / 2 - _.templates.projectile.playerInitialMissle.width / 2;
    const yProjPos = this.y;
    _.spawnProjectile(_.getKeyByValue(_.chars, this), xProjPos, yProjPos, "playerInitialMissle", "top");
  }
  // Regular Actions
  this.templates.char.player.regularActions = function(){
    this.activeKeyToMotion();
    this.executeMotion();
    this.startActionsDependentOnLevel();
    this.checkCollision();
  }
  // All Enemies
  for (key in this.templates.char){
    const charTmpl = this.templates.char[key];
    if (charTmpl.fraction === "enemy"){
      // Level-Dependent Primitives
      charTmpl.autoShootLoopsLeftMax = 3000;
      charTmpl.autoShootLoopsLeftMin = 500;
      // Other Level-Dependent Properties
      charTmpl.projectileSpawner = function(){
        if (_.getKeyByValue(_.chars, this) !== "undefinied") {
          const xProjPos = this.x + this.width / 2 - _.templates.projectile.weakEnemyMissle.width / 2;
          const yProjPos = this.y + this.height;
          _.spawnProjectile(_.getKeyByValue(_.chars, this), xProjPos, yProjPos, "weakEnemyMissle", "down");
        }
      }
      // Regular Actions
      charTmpl.regularActions = function(){
        this.executeMotion();
        this.startActionsDependentOnLevel();
        this.checkCollision();
        this.checkAutoShoot();
      }
    }
  }
  // All Projectiles
  for (key in this.templates.projectile){
    this.templates.projectile[key].regularActions = function(){
      this.executeMotion();
      this.checkCollision();
      this.disapearIfOutsideOfCanvas();
    }
  }

  // GAME ELEMENT
  function GameElem(type, template, x, y){
    this.type = type;
    // Copy each element property
    for (key in _.templates[type][template]) this[key] = _.templates[type][template][key];
    // Set position
    this.x = x;
    this.y = y;
    // Get random number of loops left until shoot
    this.autoShootLoopsLeft = _.getRandomIntegerBetween(this.autoShootLoopsLeftMin, this.autoShootLoopsLeftMax);
  }

  // GAME PROTOTYPE METHOD FOR CREATING GAME ELEMENT
  Game.prototype.createGameElem = function(type, template, x, y){
    return new GameElem(type, template, x, y);
  }
  
}
