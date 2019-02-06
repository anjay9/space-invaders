Game.prototype.assignCanvas = function(canvasId){
  this.canvas = document.getElementById(canvasId);
  this.context = this.canvas.getContext("2d");
}

Game.prototype.setCanvasSize = function(width, height){
  this.canvas.width = width;
  this.canvas.height = height;
}
