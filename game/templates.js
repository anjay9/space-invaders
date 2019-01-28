Game.prototype.loadTemplates = function(){

  const _ = this;

  // TEMPLATE
  function Template(fraction, style, width, height, speed){
    this.fraction = fraction;
    this.style = style;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.motion = "none";
  }

  // CREATING TEMPLATES
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

  // ELEMENT
  function GameElem(type, template, x, y){
    // Copy each element property
    for (key in _.templates[type][template]) this[key] = _.templates[type][template][key];
    // Set position
    this.x = x;
    this.y = y;
  }

  // Starter of Regular Functions
  GameElem.prototype.startRegularActions = function(){
    if (typeof this.regularActions === "function"){
      setInterval(function(){ this.regularActions() }.bind(this) ,1000/this.speed);
    }
    else{
      console.log(this);
      console.log("^ The element above doesnt contain the regularActions funciton.");
    }
  }

  // Regular Actions
  GameElem.prototype.executeMotion = function(){
    if (this.motion === "left") this.x--;
    else if (this.motion === "right") this.x++;
    else if (this.motion === "top") this.y--;
    else if (this.motion === "down") this.y++;
  }
  GameElem.prototype.activeKeyToMotion = function(){
    if (this.activeMotionKeys.length === 0) this.motion = "none";
    else this.motion = this.activeMotionKeys[0];
  }
  GameElem.prototype.isHit = function(){
    for (key in _.projectiles){
      const proj = _.projectiles[key];
      // Projectiles doesnt kill characters from the same fraction.
      if (this.fraction !== proj.fraction){
        // Projectile isn't touching the character from the perspective of one axle - Return True
        // Otherwise - Return False
        const hitFromPerspectiveOfOneAxle = (axle) => {
          const isLarger = (larger, smaller) => {
            if (larger > smaller) return true;
            else return false;
          }
          if (isLarger(this[axle], proj[axle]) === isLarger(this[axle], proj[axle] + proj.width)
          === isLarger(this[axle] + this.width, proj[axle]) === isLarger(this[axle] + this.width, proj[axle])) return false;
          else return true;
        }
        // Check if the character is hit from the perspective of both axes
        if (hitFromPerspectiveOfOneAxle("x") && hitFromPerspectiveOfOneAxle("y")) return true;
      }
    }
    // No projectiles hit the character
    return false;
  }

  // Other Actions
  GameElem.prototype.shoot = function(){
    const index = _.projectiles.push(_.createGameElem("projectile", "playerInitialMissle", this.x + this.width / 2 - _.templates.projectile.weakEnemyMissle.width / 2, this.y));
    _.projectiles[index-1].motion = "top";
    _.projectiles[index-1].regularActions = function(){
      _.projectiles[index-1].executeMotion();
    }
    _.projectiles[index-1].startRegularActions();
  }

  Game.prototype.createGameElem = function(type, template, x, y){
    return new GameElem(type, template, x, y);
  }

}
