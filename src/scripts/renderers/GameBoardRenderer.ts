import { GameBoard } from '../models/GameBoard';
import '../../styles/gameBoard.css';

export class GameBoardRenderer {
  private gameBoard: GameBoard;
  private container: HTMLElement;

  constructor(gameBoard: GameBoard, container: HTMLElement) {
    this.gameBoard = gameBoard;
    this.container = container;
  }

  public render(): void {
    this.container.innerHTML = '';
    const gridElement = document.createElement('div');
    gridElement.className = 'game-grid';

    for (let row = 0; row < this.gameBoard.getHeight(); row++) {
      const rowElement = document.createElement('div');
      rowElement.className = 'grid-row';
      for (let col = 0; col < this.gameBoard.getWidth(); col++) {
        const cellElement = document.createElement('div');
        cellElement.className = `grid-cell ${this.gameBoard.getCellState(col, row)}`;
        rowElement.appendChild(cellElement);
      }
      gridElement.appendChild(rowElement);
    }
    this.container.appendChild(gridElement);
  }
}