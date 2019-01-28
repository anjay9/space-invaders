const firstGame = new Game();

window.onload = firstGame;

firstGame.loadBasics();
firstGame.loadTemplates();
firstGame.loadLevel(1);

firstGame.addKeys();

firstGame.startAllActions();
firstGame.startDrawing(60);

console.log(firstGame);
