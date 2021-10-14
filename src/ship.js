export default class Ship {
  construtor(length, location) {
    this.length = length;
    this.sunk = false;
    this.location = location;
    this.hits = [];
  }

  hit() {
    this.hits.push('');
    this.isSunk();
  }

  isSunk() {
    if (this.hits.length === this.length) { this.sunk = true; }
  }
}
