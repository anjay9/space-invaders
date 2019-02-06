// Creating and setting new Game obj
const firstGame = new Game("game-canvas");
firstGame.assignCanvas("game-canvas");
firstGame.setCanvasSize(400, 400);
firstGame.loadTemplates();
firstGame.setGameLoop();
firstGame.addKeys();
firstGame.loadLevel(1);

console.log(firstGame);
