const getCellKey = (x, y) => `${x},${y}`;

export default class Grid {
  constructor(x, y) {
    this._grid = [];
    for (let i = 0; i < y; i++) {
      this._grid = [...this.grid, '0'.repeat(x).split('').map(Number)]
    }
    this._liveCells = {};
  }

  addLiveCell(x, y) {
    this._grid[y][x] = 1;
    this._liveCells[getCellKey(x, y)] = true;
  }

  killCell(x, y) {
    this._grid[y][x] = 0;
    delete this._liveCells[getCellKey(x, y)];
  }

  getNeighbors(x, y) {
    return {
      ...this._getUpperLeftNeighbor(x, y),
      ...this._getUpperMiddleNeighbor(x, y),
      ...this._getUpperRightNeighbor(x, y),
      ...this._getLeftNeighbor(x, y),
      ...this._getRightNeighbor(x, y),
      ...this._getBottomLeftNeighbor(x, y),
      ...this._getBottomMiddleNeighbor(x, y),
      ...this._getBottomRightNeighbor(x, y),
    };
  }

  countNeighbors(x, y) {
    const neighbors = this.getNeighbors(x, y);
    return Object.keys(neighbors).reduce((curTotal, key) => curTotal + neighbors[key], 0);
  }

  get grid() {
    return this._grid;
  }

  get horizontalLength() {
    return this._grid[0].length;
  }

  get verticalLength() {
    return this._grid.length;
  }

  _inBounds(x, y) {
    return this._inXBounds(x) && this._inYBounds(y);
  }

  _inXBounds(x) {
    return x >= 0 && x < this.horizontalLength;
  }

  _inYBounds(y) {
    return y >= 0 && y < this.verticalLength;
  }

  _getANeighbor(x, y) {
    return { [getCellKey(x, y)]: this._inBounds(x, y) ? this._grid[y][x] : null };
  }

  _getUpperLeftNeighbor(x, y) {
    return this._getANeighbor(x-1, y-1);
  }

  _getUpperMiddleNeighbor(x, y) {
    return this._getANeighbor(x, y-1);
  }

  _getUpperRightNeighbor(x, y) {
    return this._getANeighbor(x+1, y-1);
  }

  _getLeftNeighbor(x, y) {
    return this._getANeighbor(x-1, y);
  }

  _getRightNeighbor(x, y) {
    return this._getANeighbor(x+1, y);
  }

  _getBottomLeftNeighbor(x, y) {
    return this._getANeighbor(x-1, y+1);
  }

  _getBottomMiddleNeighbor(x, y) {
    return this._getANeighbor(x, y+1);
  }

  _getBottomRightNeighbor(x, y) {
    return this._getANeighbor(x+1, y+1);
  }
}
