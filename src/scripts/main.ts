import { GameBoard } from './models/GameBoard';
import { GameBoardRenderer } from './renderers/GameBoardRenderer';

document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = new GameBoard();
  const container = document.getElementById('gameBoardContainer') as HTMLElement;
  const renderer = new GameBoardRenderer(gameBoard, container);
  renderer.render();
});