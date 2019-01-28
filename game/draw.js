Game.prototype.startDrawing = function(fps){

  const _ = this;

  setInterval(function(){

    // Canvas
    _.context.fillStyle = _.defaultStyle;
    _.context.fillRect(0, 0, _.canvas.width, _.canvas.height);

    // Characters
    for (key in _.chars){
      const char = _.chars[key];
      _.context.fillStyle = char.style;
      _.context.fillRect(char.x, char.y, char.width, char.height);
    }

    // Projectiles
    for (key in _.projectiles){
      const projectile = _.projectiles[key];
      _.context.fillStyle = projectile.style;
      _.context.fillRect(projectile.x, projectile.y, projectile.width, projectile.height);
    }

  },1000/fps);

}
