import Ship from './ship';

export default class Gameboard {
  constructor() {
    this.board = [];
    this.hits = [];
    this.misses = [];
    this.ships = [];
    this.allSunk = false;

    for (let i = 0; i < 10; i++) {
      this.board.push([]);
      for (let j = 0; j < 10; j++) {
        this.board[i].push(null);
      }
    }
  }

  // creates a ship with the following parameters, appends it to the gameboard ship array, and places it in a specific location
  createShip(length, mode, coords) {
    const itX = coords.x + 1;
    const itY = coords.y + 1;

    if (mode === 'h') {
      this.board[coords.x][coords.y] = 'ht';
      this.board[coords.x][coords.y + length + 1] = 'hb';
      const coordsArray = [];
      for (let i = 0; i < length; i++) {
        this.board[coords.x][itY + i] = '-';
        coordsArray.push({ x: coords.x, y: itY + i });
      }
      const newShip = new Ship(length, mode, coordsArray);
      this.ships.push(newShip);
    }

    if (mode === 'v') {
      this.board[coords.x][coords.y] = 'vt';
      this.board[coords.x + length + 1][coords.y] = 'vb';
      const coordsArray = [];
      for (let i = 0; i < length; i++) {
        this.board[itX + i][coords.y] = '-';
        coordsArray.push({ x: itX + i, y: coords.y });
      }
      const newShip = new Ship(length, mode, coordsArray);
      this.ships.push(newShip);
    }
  }

  // loop through each array using lodash helper function to compare
  // all ship coords to incoming attack object
  // if ship isn't there, it's a miss.  If it is, it is a hit

  receiveAttack(pos) {
    let objCheck;
    this.ships.forEach((ship) => {
      ship.coords.forEach((coord) => {
        objCheck = _.isEqual(coord, { x: pos.x, y: pos.y });
        if (objCheck) {
          ship.hit();
          this.board[pos.x][pos.y] = 'X';
        }
      });
    });
    if (this.board[pos.x][pos.y] === 'X') {
      this.hits.push(pos);
      this.checkIfSunk();
    } else {
      this.misses.push(pos);
      this.board[pos.x][pos.y] = '';
    }
  }

  // if all ships are sunk, gameboard marks allships sunk as true
  checkIfSunk() {
    if (this.ships.every((ship) => ship.sunk === true)) {
      this.allSunk = true;
    }
  }
}
