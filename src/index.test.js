import Ship from './ship';
import Gameboard from './gameboard';

test('Creates ship', () => {
  const test = new Ship(4, 'v', { x: 4, y: 2 });
  expect(test.x).toBe(4);
});

test('Ship class calculates coords', () => {
  const test = new Ship(4, 'v', { x: 4, y: 2 });
  expect(test.shipCoords).toEqual([{ x: 4, y: 2, hit: false }, { x: 4, y: 3, hit: false }, { x: 4, y: 4, hit: false }, { x: 4, y: 5, hit: false }]);
});

test('Ship can get hit', () => {
  const test = new Ship(4, 'v', { x: 4, y: 2 });
  test.hit(4, 3);
  expect(test.shipCoords[1].hit).toEqual(true);
});

test('Ship ignores hits more than once', () => {
  const test = new Ship(4, 'v', { x: 4, y: 2 });
  test.hit(4, 3);
  expect(test.hit(4, 3)).toBe('Can"t hit the same spot');
});

test('Ship returns miss if ship is missed', () => {
  const test = new Ship(4, 'v', { x: 4, y: 2 });
  test.hit(4898, 33456);
  expect(test.shipCoords[1].hit).toEqual(false);
});

test('Ship is sunk after respective hits', () => {
  const test = new Ship(4, 'v', { x: 4, y: 2 });
  test.hit(4, 2);
  test.hit(4, 3);
  test.hit(4, 4);
  test.hit(4, 5);
  expect(test.sunk).toEqual(true);
});

test('Gameboard is right size', () => {
    const gameboard = new Gameboard();
    expect(gameboard.board.length).toEqual(10);
});

