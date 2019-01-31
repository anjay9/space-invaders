Game.prototype.addKeys = function(){

  const player = this.chars.player;
  player.activeMotionKeys = [];

  // KEY DOWN
  const keyDown = (event) => {

    // Movement function declarations
    const removeClones = (value) => {
      for (i=0; i<player.activeMotionKeys.length; i++){
        if (player.activeMotionKeys[i] === value) player.activeMotionKeys.splice(i,1);
      }
    }
    const addToArray = (value) => player.activeMotionKeys.unshift(value)

    // Left
    if (event.keyCode === 37){
      if (player.activeMotionKeys[0] !== "left"){
        removeClones("left");
        addToArray("left");
      }
    }

    // Right
    else if (event.keyCode === 39){
      if (player.activeMotionKeys[0] !== "right"){
        removeClones("right");
        addToArray("right");
      }
    }

    // Shoot
    else if (event.keyCode === 32) player.shoot();

  }

  // KEY UP
  const keyUp = (event) => {

    // Function declarations
    const removeActiveKeys = (value) => {
      for (i=0; i<player.activeMotionKeys.length; i++){
        if (player.activeMotionKeys[i] === value) player.activeMotionKeys.splice(i, 1);
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
