export default class Cell {
  constructor(x = 0, y = 0) {
    this._isAlive = false;
    this._x = x;
    this._y = y
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

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }
}
