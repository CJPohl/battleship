export default class Ship {
  constructor(length, mode, coordsArray) {
    this.length = length;
    this.sunk = false;
    this.mode = mode;
    this.coords = coordsArray;
    this.hits = [];
  }

  // if ship is hit, push an hit marker to hits array
  hit() {
    this.hits.push('X');
    this.isSunk();
  }

  // everytime ship is hit, function is called to check sunk status
  isSunk() {
    if (this.hits.length === this.length) { this.sunk = true; }
  }
}
