import Grid from '../grid';

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
    grid.addLiveCell(2, 2);
    expect(grid.getNeighbors(2, 2)).toEqual([
      
    ]);
  });
});
