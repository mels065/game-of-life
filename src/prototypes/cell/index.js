export default class Cell {
  constructor() {
    this._isAlive = false;
  }

  toggleLifeState() {
    this._isAlive = !this._isAlive;
    return this;
  }

  valueOf() {
    return Number(this.isAlive);
  }

  get isAlive() {
    return this._isAlive;
  }
}
