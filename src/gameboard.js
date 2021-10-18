import Ship from './ship';

export default class Gameboard {
  constructor() {
    this.board = [];
    this.ships = [];

    for (let i = 0; i < 10; i++) {
      this.board.push([]);
      for (let j = 0; j < 10; j++) {
        this.board[i].push(null);
      }
    }
  }

  createShip(number, length, mode, coords) {
    this.board[coords.x][coords.y] = number;

    const itX = coords.x + 1;
    const itY = coords.y + 1;
    
    if (mode === 'h') {
      this.board[coords.x][coords.y + length + 1] = '>';
      const coordsArray = [];
      for (let i = 0; i < length; i++) {
        this.board[coords.x][itY + i] = '-';
        coordsArray.push({ x: coords.x, y: itY + i });
      }
      const newShip = new Ship(length, mode, coordsArray);
      this.ships.push(newShip);
    }

    if (mode === 'v') {
      this.board[coords.x + length + 1][coords.y] = '>';
      const coordsArray = [];
      for (let i = 0; i < length; i++) {
        this.board[itX + i][coords.y] = '-';
        coordsArray.push({ x: itX + i, y: coords.y });
      }
      const newShip = new Ship(length, mode, coordsArray);
      this.ships.push(newShip);
    }
  }

  receiveAttack(pos) { // todo maybe try for each again ( for each of the 2d arrays )
    for (let i = 0; i < this.ships.length; i++) {
      for (let j = 0; j < this.ships.length; i++) {
        if (this.ships.coords[i] === { x: pos.x, y: pos.y }) {
          this.ships[i].hit();
        }
      }
    }
  }
}

const gameboard = new Gameboard();
gameboard.createShip(1, 4, 'v', { x: 4, y: 2 });
gameboard.createShip(2, 5, 'h', { x: 1, y: 1 });
console.log(gameboard.board);
console.log(gameboard.ships);
//gameboard.receiveAttack({ x: 1, y: 2 });
console.log(gameboard.ships[0].coords[2].x);
