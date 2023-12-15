type Position = { x: number, y: number };
type Direction = 'up' | 'down' | 'left' | 'right';

export class Snake {
  private body: Position[];
  private bodySet: Set<string>;
  private direction: Direction;

  constructor(initialPosition: Position) {
    this.body = [initialPosition];
    this.direction = 'right';
    this.bodySet = new Set();
    this.bodySet.add(this.positionToString(initialPosition));
  }

  public move() {
    let head = this.getHead();
    let newHead: Position;

    switch (this.direction) {
      case 'right':
        newHead = { x: head.x + 1, y: head.y };
        break;
      case 'left':
        newHead = { x: head.x - 1, y: head.y };
        break;
      case 'up':
        newHead = { x: head.x, y: head.y - 1 };
        break;
      case 'down':
        newHead = { x: head.x, y: head.y + 1 };
        break;
      default:
        throw new Error(`Invalid direction ${this.direction}`);
    }

    if (this.body.length > 1) {
      this.bodySet.delete(this.positionToString(this.body[this.body.length - 1]));
    }

    this.body.unshift(newHead);
    this.bodySet.add(this.positionToString(newHead));

    if (this.body.length > 1) {
      this.body.pop();
    }
  }

  public grow() {
    let tail = this.body[this.body.length - 1];
    this.body.push({ ...tail });
  }

  public getBody(): Position[] {
    return this.body;
  }

  private positionToString(position: Position): string {
    return `${position.x},${position.y}`;
}

  public setDirection(direction: Direction) {
    if (this.isOppositeDirection(direction)) {
      return;
    }
    this.direction = direction;
  }

  private isOppositeDirection(direction: Direction): boolean {
    switch (this.direction) {
      case 'up':
        return direction === 'down';
      case 'down':
        return direction === 'up';
      case 'left':
        return direction === 'right';
      case 'right':
        return direction === 'left';
      default:
        throw new Error(`Invalid direction ${this.direction}`);
    }
  }

  private getHead(): Position {
    return this.body[0];
  }

  public checkCollision(boardSize: { width: number; height: number}): boolean {
    let head = this.getHead();
    let isHeadOutsideX = head.x < 0 || head.x >= boardSize.width;
    let isHeadOutsideY = head.y < 0 || head.y >= boardSize.height;
    let isHeadOutside = isHeadOutsideX || isHeadOutsideY;
    let isHeadOnBody = this.body.length > 1 && this.bodySet.has(this.positionToString(head));
    return isHeadOutside || isHeadOnBody;
  }
}