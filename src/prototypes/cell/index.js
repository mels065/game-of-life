export default class Cell {
  constructor() {
    this._isAlive = false;
  }

  toggleLifeState() {
    this._isAlive = !this._isAlive;
    return this;
  }

  copy() {
    const newCell = new Cell();
    if (this.isAlive) newCell.toggleLifeState();
    return newCell;
  }

  valueOf() {
    return Number(this.isAlive);
  }

  get isAlive() {
    return this._isAlive;
  }
}
