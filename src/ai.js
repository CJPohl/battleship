import Gameboard from './gameboard';

export default class AI {
  constructor() {
    this.aiBoard = new Gameboard();
    this.shots = [];
    this.shipLocations = [];
  }

  // automatically create AI ships
  generateShips() {
    const first = this.generateH();
    this.aiBoard.createShip(2, 'h', first);
    const second = this.generateV();
    this.aiBoard.createShip(3, 'v', second);
    const third = this.generateH();
    this.aiBoard.createShip(3, 'h', third);
    const forth = this.generateV();
    this.aiBoard.createShip(4, 'v', forth);
    const fifth = this.generateH();
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
    let first = _.random([0], [4]);
    let second = _.random([0], [9]);
    let coords = { x: first, y: second };
    
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
    let coords;
    while (true) {
      coords = this.generateCoords();
      if (this.shots.some((shot) => _.isEqual(shot, coords))) {
        coords = this.generateCoords();
      } else {
        this.shots.push(coords);
        return coords;
      }
    }
  }
}
