/* eslint-disable eqeqeq */

import Cell from '../cell';

describe('Cell', () => {
  it('exists', () => {
    expect(new Cell()).toBeTruthy();
  });

  it('it has a number represent the state', () => {
    expect(new Cell() == 0).toBe(true);
  });

  it('can become alive', () => {
    const cell = new Cell();
    cell.toggleLifeState();
    expect(cell.isAlive).toBe(true);
  });

  it('can go back to a dead state', () => {
    const cell = new Cell().toggleLifeState().toggleLifeState();
    expect(cell.isAlive).toBe(false);
  });

  it('has its number dependent on its alive state', () => {
    expect(new Cell().toggleLifeState() == 1).toBe(true);
  });

  it('can copy itself into a different instance', () => {
    const cell = new Cell();
    expect(cell === cell.copy()).toBe(false);
  });

  it('can copy itself with identical state', () => {
    const cell = new Cell().toggleLifeState();
    expect(cell == 1 && cell.copy() == 1).toBe(true);
  });
})
