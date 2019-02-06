Game.prototype.loadTemplates = function(){

  this.templates = {};
  const thisGame = this;

  function Template (color, width, height, velocity){
    this.color = color;
    this.width = width;
    this.height = height;
    this.velocity = velocity;
  }
  Template.prototype.move = function(delta){
    if (this.direction === "left") this.x = this.x - this.velocity * delta;
    else if (this.direction === "right") this.x = this.x + this.velocity * delta;
    else if (this.direction === "up") this.y = this.y - this.velocity * delta;
    else if (this.direction === "down") this.y = this.y + this.velocity * delta;
  }

  this.templates = {
    player: new Template("green", 20, 20, 0.2),
    weakEnemy: new Template("pink", 20, 20, 1),
    neutralMissle: new Template("yellow", 5, 5, 1)
  };

}
