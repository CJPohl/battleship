export default class Ship {
  constructor(length, mode, coordsArray) {
    this.length = length;
    this.sunk = false;
    this.mode = mode;
    this.coords = coordsArray;
    this.hits = [];
  }

  // method to iterate through coord array to check if hit
  hit() {
    this.hits.push('X');
    this.isSunk();
  }

  isSunk() {
    if (this.hits.length === this.length) { this.sunk = true; }
  }
}
