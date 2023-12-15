import { GameController } from './controllers/GameController';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('gameBoardContainer') as HTMLElement;
  const gameController = new GameController(container);
  gameController.start();
});