import Gameboard from './gameboard';

export default class Player {
  constructor(name) {
    this.name = name;
    this.playerBoard = new Gameboard();
    this.shots = [];
  }

  // prompt for player to enter coords to create ships on gameboard
  generateShips() {
    this.playerBoard.createShip(1, 2);
    this.playerBoard.createShip(2, 3);
    this.playerBoard.createShip(3, 3);
    this.playerBoard.createShip(4, 4);
    this.playerBoard.createShip(5, 5);
  }

  // prompt for player to enter coords to attack AI board
  shoot(coords) {
    if (this.shots.some((shot) => _.isEqual(shot, coords))) {
      // warn the player you've shot here already
    }
    else {
      this.aiBoard.receiveAttack(coords);
      this.shots.push(coords);
    }
  }
}
