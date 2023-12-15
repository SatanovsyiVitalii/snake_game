import { GameBoard } from '../models/GameBoard';
import { Snake } from '../models/Snake';
import { GameBoardRenderer } from '../renderers/GameBoardRenderer';

export class GameController {
  private gameBoard: GameBoard;
  private snake: Snake;
  private renderer: GameBoardRenderer;
  private lastUpdateTime: number;
  private updateInterval: number;

  constructor(container: HTMLElement) {
    this.gameBoard = new GameBoard();
    this.snake = new Snake({ x: 5, y: 5 });
    this.renderer = new GameBoardRenderer(this.gameBoard, container);

    this.setupInputHandlers();
    this.lastUpdateTime = 0;
    this.updateInterval = 500;
  }

  private setupInputHandlers(): void {
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowUp': this.snake.setDirection('up'); break;
        case 'ArrowDown': this.snake.setDirection('down'); break;
        case 'ArrowLeft': this.snake.setDirection('left'); break;
        case 'ArrowRight': this.snake.setDirection('right'); break;
      }
    });
  }

  public start(): void {
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  private gameLoop(timestamp: number): void {
    if (timestamp - this.lastUpdateTime > this.updateInterval) {
      this.lastUpdateTime = timestamp;
      this.snake.move();
      this.gameBoard.updateWithSnake(this.snake);
      this.renderer.render();
    }

    if (!this.snake.checkCollision({ width: this.gameBoard.getWidth(), height: this.gameBoard.getHeight() })) {
      requestAnimationFrame(this.gameLoop.bind(this));
    } else {
      alert('Game Over!');
    }
  }
}