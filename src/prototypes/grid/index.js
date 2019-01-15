import Cell from '../cell';

const getCellKey = (x, y) => `${x},${y}`;
const parseCellKey = key => key.split(',').map(Number);

export default class Grid {
  constructor(x, y) {
    this._grid = [];
    for (let i = 0; i < y; i++) {
      this._grid = [...this._grid, '0'.repeat(x).split('').map((_, j) => new Cell(j, i))];
    }
    this._liveCells = {};
  }

  addLiveCell(x, y) {
    const cell = this.getCell(x, y);
    if (!cell.isAlive) {
      cell.toggleLifeState();
      this._liveCells[getCellKey(x, y)] = [x, y];
    }
  }

  killCell(x, y) {
    const cell = this.getCell(x, y);
    if (cell.isAlive) {
      cell.toggleLifeState();
      delete this._liveCells[getCellKey(x, y)];
    }
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

  getAliveNeighbors(x, y) {
    const neighbors = this.getNeighbors(x, y);
    return Object.keys(neighbors).reduce((result, key) => 
      neighbors[key] === 1 ? { ...result, [key]: neighbors[key] } : result,
      {}
    );
  }

  getDeadNeighbors(x, y) {
    const neighbors = this.getNeighbors(x, y);
    return Object.keys(neighbors).reduce((result, key) => 
      neighbors[key] === 0 ? { ...result, [key]: neighbors[key] } : result,
      {}
    );
  }

  countNeighbors(x, y) {
    const neighbors = this.getNeighbors(x, y);
    return Object.keys(neighbors).reduce((curTotal, key) => curTotal + neighbors[key], 0);
  }

  getCell(x, y) {
    return this._grid[y][x];
  }

  getCellValue(x, y) {
    return this.getCell(x, y) + 0;
  }

  tick() {
    let cellsToDie = [];
    let deadCellsToGiveLife = [];
    Object.keys(this._liveCells).forEach((key) => {
      const cellCoord = this._liveCells[key];
      const neighborCount = this.countNeighbors(...cellCoord);
      if (neighborCount < 2 || neighborCount > 3) {
        cellsToDie = [...cellsToDie, cellCoord];
      }
      const deadNeighbors = this.getDeadNeighbors(...cellCoord);
      Object.keys(deadNeighbors).forEach((key2) => {
        const deadCellCoord = parseCellKey(key2);
        if (this.countNeighbors(...deadCellCoord) === 3) {
          deadCellsToGiveLife = [...deadCellsToGiveLife, deadCellCoord]
        }
      });
    });

    cellsToDie.forEach(cellCoord => this.killCell(...cellCoord));
    deadCellsToGiveLife.forEach(cellCoord => this.addLiveCell(...cellCoord));
  }

  copy() {
    const gridCopy = new Grid(this.horizontalLength, this.verticalLength);
    Object.keys(this._liveCells).forEach(key => gridCopy.addLiveCell(...this._liveCells[key]));
    return gridCopy;
  }

  flatten() {
    return this._grid.reduce((flattenedCopy, row) => [...flattenedCopy, ...row], []);
  }

  generateRandomGrid(percentage = 50) {
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    for (let i = 0; i < this._grid.length; i++) {
      for (let j = 0; j < this._grid[i].length; j++) {
        if (Math.random() >= (100 - percentage) / 100.0) this.addLiveCell(j, i);
        else this.killCell(j, i);
      }
    }
    
    return this;
  }

  reset() {
    for (let i = 0; i < this._grid.length; i++) {
      for (let j = 0; j < this._grid[0].length; j++) {
        this.killCell(j, i);
      }
    }
    return this;
  }

  get grid() {
    return this._grid.map(cellRow => cellRow.map(cell => cell + 0));
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
    return { [getCellKey(x, y)]: this._inBounds(x, y) ? this.getCellValue(x, y) : null };
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
