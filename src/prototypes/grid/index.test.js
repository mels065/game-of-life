import Grid from '../grid';
import Cell from '../cell';

describe('Grid', () => {
  it('generates a grid', () => {
    expect(new Grid(4, 3).grid).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });

  it('generates a grid', () => {
    expect(new Grid(7, 7).grid).toEqual([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ])
  });

  it('adds a live to cell to coordinate', () => {
    const grid = new Grid(4, 3);
    grid.addLiveCell(2, 2);
    expect(grid.grid).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 1, 0],
    ]);
  });

  it('kills a cell at a coordinate', () => {
    const grid = new Grid(4, 3);
    grid.addLiveCell(1, 1);
    grid.killCell(1, 1);
    expect(grid.grid).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });

  it('gets the neighbors of cell', () => {
    const grid = new Grid(5, 5);
    expect(grid.getNeighbors(2, 2)).toEqual({
      '1,1': 0,
      '2,1': 0,
      '3,1': 0,
      '1,2': 0,
      '3,2': 0,
      '1,3': 0,
      '2,3': 0,
      '3,3': 0,
    });
  });

  it('gets the neighbors of cell', () => {
    const grid = new Grid(10, 6);
    expect(grid.getNeighbors(4, 3)).toEqual({
      '3,2': 0,
      '4,2': 0,
      '5,2': 0,
      '3,3': 0,
      '5,3': 0,
      '3,4': 0,
      '4,4': 0,
      '5,4': 0,
    });
  });

  it('marks `null` for no neighbor', () => {
    const grid = new Grid(1, 1);
    expect(grid.getNeighbors(0, 0)).toEqual({
      '-1,-1': null,
      '0,-1': null,
      '1,-1': null,
      '-1,0': null,
      '1,0': null,
      '-1,1': null,
      '0,1': null,
      '1,1': null,
    });
  });

  it('counts the neighbors around a cell', () => {
    const grid = new Grid(4, 3);
    expect(grid.countNeighbors(2,2)).toEqual(0);
  });

  it('counts the neighbors around a cell', () => {
    const grid = new Grid(4, 3);
    grid.addLiveCell(1,2);
    expect(grid.countNeighbors(2,2)).toEqual(1);
  });

  it('can get value of a cell', () => {
    expect(new Grid(1,1).getCellValue(0, 0)).toBe(0);
  });

  it('has instances of Cell as the cells', () => {
    console.log(new Grid(1, 1));
    expect(new Grid(4, 3).getCell(2, 2) instanceof Cell).toBe(true);
  })
});
