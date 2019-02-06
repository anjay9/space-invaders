Game.prototype.draw = function(){
  // Canvas
  this.context.fillStyle = "black";
  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  // Chars
  for (key in this.chars){
    const char = this.chars[key];
    this.context.fillStyle = char.color;
    this.context.fillRect(char.x, char.y, char.width, char.height);
  }
  // FPS
  this.context.font = "25px Comic Sans MS";
  this.context.fillStyle = "red";
  this.context.fillText(Math.round(this.fps) + ' FPS', 2, 25);
}

Game.prototype.activeKeyToDirection = function(char){
  if (this.activeMotionKeys.length === 0) char.direction = "none";
  else char.direction = this.activeMotionKeys[0];
}

Game.prototype.update = function(delta){
  this.activeKeyToDirection(this.chars.player0);
  for (key in this.chars) this.chars[key].move(delta);
}

Game.prototype.panic = function(){
  this.delta = 0;
}

Game.prototype.setGameLoop = function(maxFPS){
  this.lastFrameTimeMs = 0;
  this.maxFPS = 60;
  this.delta = 0;
  this.timestep = 1000 / 60;
  this.fps = 60;
  this.framesThisSecond = 0;
  this.lastFpsUpdate = 0;

  this.gameLoop = function(timestamp){
    // Throttle the frame rate.
    if (timestamp < this.lastFrameTimeMs + (1000 / this.maxFPS)) {
      requestAnimationFrame(this.gameLoop);
      return;
    }
    this.delta += timestamp - this.lastFrameTimeMs;
    this.lastFrameTimeMs = timestamp;

    if (timestamp > this.lastFpsUpdate + 1000) {
        this.fps = 0.25 * this.framesThisSecond + 0.75 * this.fps;

        this.lastFpsUpdate = timestamp;
        this.framesThisSecond = 0;
    }
    this.framesThisSecond++;

    let numUpdateSteps = 0;
    while (this.delta >= this.timestep){
      this.update(this.timestep);
      this.delta -= this.timestep;
      if (++this.numUpdateSteps >= 240){
        this.panic();
        break;
      }
    }
    this.draw();
    requestAnimationFrame(this.gameLoop);
  }.bind(this)
}

Game.prototype.startGameLoop = function(){
  requestAnimationFrame(this.gameLoop);
}
