import Gameboard from './gameboard';

export default class AI {
  constructor() {
    this.aiBoard = new Gameboard();
    this.shots = [];
  }

  // automatically create AI ships
  generateShips() {
    const first = this.generateH();
    const second = this.generateV();
    const third = this.generateH();
    const forth = this.generateV();
    const fifth = this.generateH();
    this.aiBoard.createShip(2, 'h', first);
    this.aiBoard.createShip(3, 'v', second);
    this.aiBoard.createShip(3, 'h', third);
    this.aiBoard.createShip(4, 'v', forth);
    this.aiBoard.createShip(5, 'h', fifth);
  }

  // generate coords for horizontally placed ships
  generateH() {
    const first = _.random([0], [9]);
    const second = _.random([0], [3]);
    const coords = { x: first, y: second };
    return coords;
  }

  // generate coords for vertically placed ships
  generateV() {
    const first = _.random([0], [4]);
    const second = _.random([0], [9]);
    const coords = { x: first, y: second };
    return coords;
  }

  // generate coords for shots
  generateCoords() {
    const first = _.random([0], [9]);
    const second = _.random([0], [9]);
    const coords = { x: first, y: second };
    
    return coords;
  }

  // if generated coords are already in array, using recursion, call the same function again until coords aren't in array
  shoot() {
    const coords = this.generateCoords();
    if (this.shots.some((shot) => _.isEqual(shot, coords))) {
      this.shoot();
    } else {
      this.shots.push(coords);
      
      return coords;
    }
  }
}
