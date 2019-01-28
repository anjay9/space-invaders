Game.prototype.lvl_1 = function(){

  // PROJECTILES EMPTY ARRAY
  this.projectiles = [];

  // CHARACTERS
  this.chars = {
    player: this.createGameElem("char", "player", 300/2-30/2, 240),
    enemy_0: this.createGameElem("char", "weakEnemy", 10, 10),
    enemy_1: this.createGameElem("char", "weakEnemy", 50, 10),
    enemy_2: this.createGameElem("char", "weakEnemy", 90, 10),
    enemy_3: this.createGameElem("char", "weakEnemy", 130, 10),
    enemy_4: this.createGameElem("char", "weakEnemy", 170, 10),
    enemy_5: this.createGameElem("char", "weakEnemy", 10, 50),
    enemy_6: this.createGameElem("char", "weakEnemy", 50, 50),
    enemy_7: this.createGameElem("char", "weakEnemy", 90, 50),
    enemy_8: this.createGameElem("char", "weakEnemy", 130, 50),
    enemy_9: this.createGameElem("char", "weakEnemy", 170, 50),
    enemy_10: this.createGameElem("char", "weakEnemy", 10, 90),
    enemy_11: this.createGameElem("char", "weakEnemy", 50, 90),
    enemy_12: this.createGameElem("char", "weakEnemy", 90, 90),
    enemy_13: this.createGameElem("char", "weakEnemy", 130, 90),
    enemy_14: this.createGameElem("char", "weakEnemy", 170, 90)
  };

  // ADDITIONAL PROPERIES
  // Enemies
  for (key in this.chars){
    if (key.includes("enemy")){
      this.chars[key].patrolPointA = this.chars[key].x;
      this.chars[key].patrolPointB = this.chars[key].x + 90;
    }
  }

  // ASSIGNING ACTIONS
  // Player
  this.chars.player.regularActions = function(){
    this.activeKeyToMotion();
    this.executeMotion();
  }
  // Enemy
  for (key in this.chars){
    if (key.includes("enemy")){
      const enemy = this.chars[key];
      // Function Declarations
      const enemyReachedPoint = (point) => {
        if (enemy.x === enemy["patrolPoint"+point]) return true;
        else return false;
      }
      const allEnemiesReached = (point) => {
        for (key in this.chars){
          if (key.includes("enemy")){
            if (this.chars[key].x !== this.chars[key]["patrolPoint"+point]) return false;
          }
        }
        return true;
      }
      const setAllEnemiesMotion = (direction) => {
        for (key in this.chars){
          if (key.includes("enemy")){
            this.chars[key].motion = direction;
          }
        }
      }
      enemy.regularActions = function(){
        this.executeMotion();
        if (enemyReachedPoint("A") || enemyReachedPoint("B")) enemy.motion = "none";
        if (allEnemiesReached("A")) setAllEnemiesMotion("right");
        else if (allEnemiesReached("B")) setAllEnemiesMotion("left");
      }
    }
  }

}
