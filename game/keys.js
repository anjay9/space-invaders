Game.prototype.addKeys = function(){
  
  this.activeMotionKeys = [];

  // KEY DOWN
  const keyDown = (event) => {
    // Movement function declarations
    const removeClones = (value) => {
      for (i=0; i<this.activeMotionKeys.length; i++){
        if (this.activeMotionKeys[i] === value) this.activeMotionKeys.splice(i,1);
      }
    }
    const addToArray = (value) => this.activeMotionKeys.unshift(value)
    // Left
    if (event.keyCode === 37){
      if (this.activeMotionKeys[0] !== "left"){
        removeClones("left");
        addToArray("left");
      }
    }
    // Right
    else if (event.keyCode === 39){
      if (this.activeMotionKeys[0] !== "right"){
        removeClones("right");
        addToArray("right");
      }
    }
    // Shoot ?
  }

  // KEY UP
  const keyUp = (event) => {
    // Function declarations
    const removeActiveKeys = (value) => {
      for (i=0; i<this.activeMotionKeys.length; i++){
        if (this.activeMotionKeys[i] === value) this.activeMotionKeys.splice(i, 1);
      }
    }
    // Left
    if (event.keyCode === 37) removeActiveKeys("left");
    // Right
    else if (event.keyCode === 39) removeActiveKeys("right");
  }

  // ADD EVENT LISTENERS
  document.addEventListener("keydown", function(){keyDown(event)} );
  document.addEventListener("keyup", function(){keyUp(event)} );

}
