import Gameboard from './gameboard';

export default class Player {
  constructor(name) {
    this.name = name;
    this.playerBoard = new Gameboard();
    this.shots = [];
  }

  // prompt for player to enter coords to create ships on gameboard
  generateShips(mode, coords) {
    this.playerBoard.createShip(2, mode[0], coords[0]);
    this.playerBoard.createShip(3, mode[1], coords[1]);
    this.playerBoard.createShip(3, mode[2], coords[2]);
    this.playerBoard.createShip(4, mode[3], coords[3]);
    this.playerBoard.createShip(5, mode[4], coords[4]);
  }

  // prompt for player to enter coords to attack AI board
  shoot(coords) {
    if (this.shots.some((shot) => _.isEqual(shot, coords))) {
      
      return false;
    }
    else {
      this.shots.push(coords);

      return true;
    }
  }
}
