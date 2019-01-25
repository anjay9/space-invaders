function Game(){}

Game.prototype.getKeyByValue = function(object, value){
  return Object.keys(object).find(key => object[key] === value);
}

Game.prototype.loadBasics = function(){
  this.canvas = document.getElementById("space-invaders-canvas");
  this.context = this.canvas.getContext("2d");
  this.canvas = document.getElementById("space-invaders-canvas");
  this.canvas.width = 300;
  this.canvas.height = 300;
  this.defaultStyle = "black";
}

Game.prototype.loadTemplates = function(){
  function CharTemplate(style, width, height, speed) {
    this.style = style;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.motion = "none";
  }
  this.charTemplates = {
    player: new CharTemplate("green", 30, 30, 200),
    weakEnemy: new CharTemplate("purple", 30, 30, 50),
    mediumEnemy: new CharTemplate("teal", 30, 30, 100),
    strongEnemy: new CharTemplate("maroon", 30, 30, 100, 150)
  }
  function ProjectileTemplate(style, width, height, speed){
    this.style = style;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.motion = "none";
  }
  this.projectileTemplates = {
    weakEnemyMissle: new ProjectileTemplate("fuchsia", 5, 5, 50)
  }
}

Game.prototype.loadLevel = function(levelNumber){
  this.currentLevel = levelNumber;
  const _ = this;

  // Char
  function Char(template, x, y){
    for (key in _.charTemplates[template]){
      this[key] = _.charTemplates[template][key];
    }
    this.x = x;
    this.y = y;
  }
  Char.prototype.startActions = function(){
    if (typeof this.actions === "function"){
      setInterval(function(){ this.actions() }.bind(this) ,1000/this.speed);
    }
    else {
      const char = _.getKeyByValue(_.chars, this);
      console.log(`The "${char}" character does not contain the "actions" function.`);
      alert(`The "${char}" character does not contain the "actions" function.`);
    }
  }
  // Character actions
  Char.prototype.activeKeyToMotion = function(){
    if (this.activeMotionKeys.length === 0) this.motion = "none";
    else this.motion = this.activeMotionKeys[0];
  }
  Char.prototype.executeMotion = function(){
    if (this.motion === "left") this.x--;
    else if (this.motion === "right") this.x++;
    else if (this.motion === "top") this.y--;
    else if (this.motion === "down") this.y++;
  }

  // Projectile
  function Projectile(template, x, y){
    for (key in _.projectileTemplates[template]){
      this[key] = _.projectileTemplates[template][key];
    }
    this.x = x;
    this.y = y;
  }

  const lvl_0 = () => {
    // Characters
    this.chars = {
      player: new Char("player", 300/2-30/2, 240),
      enemy_0: new Char("weakEnemy", 10, 10),
      enemy_1: new Char("weakEnemy", 50, 10),
      enemy_2: new Char("weakEnemy", 90, 10),
      enemy_3: new Char("weakEnemy", 130, 10),
      enemy_4: new Char("weakEnemy", 170, 10),
      enemy_5: new Char("weakEnemy", 10, 50),
      enemy_6: new Char("weakEnemy", 50, 50),
      enemy_7: new Char("weakEnemy", 90, 50),
      enemy_8: new Char("weakEnemy", 130, 50),
      enemy_9: new Char("weakEnemy", 170, 50),
      enemy_10: new Char("weakEnemy", 10, 90),
      enemy_11: new Char("weakEnemy", 50, 90),
      enemy_12: new Char("weakEnemy", 90, 90),
      enemy_13: new Char("weakEnemy", 130, 90),
      enemy_14: new Char("weakEnemy", 170, 90)
    };
    // Enemy Additional Properties
    for (key in this.chars){
      if (key.includes("enemy")){
        this.chars[key].patrolPointA = this.chars[key].x;
        this.chars[key].patrolPointB = this.chars[key].x + 90;
      }
    }
    // Projectiles
    this.projectiles = {
      e_missle_0: new Projectile("weakEnemyMissle", 10, 10)
    };
    // Player Actions
    this.chars.player.actions = function(){
      this.activeKeyToMotion();
      this.executeMotion();
    }
    // Enemy Actions
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
    for (key in this.chars){
      if (key.includes("enemy")){
        this.chars[key].actions = function(){
          if (allEnemiesReached("A")) setAllEnemiesMotion("right");
          else if (allEnemiesReached("B")) setAllEnemiesMotion("left");
          this.executeMotion();
        }
      }
    }
  }

  eval(`lvl_${this.currentLevel}()`);

}

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

Game.prototype.startAllActions = function(){
  for (key in this.chars) this.chars[key].startActions();
}

Game.prototype.addActionKeys = function(){
  const player = this.chars.player;
  player.activeMotionKeys = [];
  const keyDown = (event) => {
    // Function declarations
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
  }
  const keyUp = (event) => {
    // Function declarations
    const removeActiveKeys = (value) => {
      for (i=0; i<player.activeMotionKeys.length; i++){
        if (player.activeMotionKeys[i] === value) player.activeMotionKeys.splice(i,1);
      }
    }
    // Left
    if (event.keyCode === 37) removeActiveKeys("left");
    // Right
    else if (event.keyCode === 39) removeActiveKeys("right");
  }
  document.addEventListener("keydown", function(){keyDown(event)} );
  document.addEventListener("keyup", function(){keyUp(event)} );
}

const firstGame = new Game();

window.onload = firstGame;

firstGame.loadBasics();
firstGame.loadTemplates();
firstGame.loadLevel(0);

firstGame.addActionKeys();

firstGame.startAllActions();
firstGame.startDrawing(60);

console.log(firstGame);
