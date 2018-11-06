function getLiveCellKey(x, y) {
  return `${x},${y}`;
}

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
    this._liveCells[getLiveCellKey(x, y)] = true;
  }

  killCell(x, y) {
    this._grid[y][x] = 0;
    delete this._liveCells[getLiveCellKey(x, y)];
  }

  get grid() {
    return this._grid;
  }
}
