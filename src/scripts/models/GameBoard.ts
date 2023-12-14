import { getCssVariableValueAsNumber } from '../utils/cssVariables';
type CellState = 'empty' | 'snake' | 'food';

export class GameBoard {
  private grid: CellState[][];
  private width: number;
  private height: number;

  constructor() {
    const gridSize = getCssVariableValueAsNumber('--grid-size');
    this.width = gridSize;
    this.height = gridSize;
    this.grid = this.createGrid();
  }

  private createGrid(): CellState[][] {
    const grid = [];
    for (let row = 0; row < this.height; row++) {
      const currentRow: CellState[] = [];
      for (let col = 0; col < this.width; col++) {
        currentRow.push('empty');
      }
      grid.push(currentRow);
    }
    return grid;
  }

  public isCellEmpty(x: number, y: number): boolean {
    if (!this.isValidPosition(x, y)) {
      throw new Error(`Invalid position (${x}, ${y})`);
    }
    return this.grid[y][x] === 'empty';
  }

  public setCellState(x: number, y: number, state: CellState): void {
    if (!this.isValidPosition(x, y)) {
      throw new Error(`Invalid position (${x}, ${y})`);
    }
    this.grid[y][x] = state;
  }

  public getCellState(x: number, y: number): CellState {
    if (!this.isValidPosition(x, y)) {
      throw new Error(`Invalid position (${x}, ${y})`);
    }
    return this.grid[y][x];
  }

  public isValidPosition(x: number, y: number): boolean {
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }
}