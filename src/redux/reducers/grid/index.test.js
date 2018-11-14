import gridReducer from '../grid';

import Grid from '../../../prototypes/grid';

import { initializeGrid, toggleLife, advanceGeneration } from '../../actions/grid';

import { ACTIONS } from '../../../constants';

describe('gridReducer', () => {
  it('returns the default state', () => {
    expect(gridReducer(undefined, {})).toEqual({
      grid: new Grid(2, 2),
    });
  });

  it(`creates a new grid when the action type is ${ACTIONS.INITIALIZE_GRID}`, () => {
    expect(gridReducer(undefined, initializeGrid(3, 3))).toEqual({
      grid: new Grid(3, 3),
    })
  });

  it(`creates a new grid when the action type is ${ACTIONS.INITIALIZE_GRID}`, () => {
    expect(gridReducer(undefined, initializeGrid(5, 2))).toEqual({
      grid: new Grid(5, 2),
    })
  });

  it(`brings a cell to life`, () => {
    const expectedGrid = new Grid(4, 4);
    expectedGrid.addLiveCell(0, 0);
    expect(
      gridReducer(
        gridReducer(undefined, initializeGrid(4,4)),
        toggleLife(0, 0),
      )
    ).toEqual(
      {
        grid: expectedGrid,
      }
    );
  });

  it('executes a tick to advance a generation', () => {
    expect(
      gridReducer(
        gridReducer(
          gridReducer(undefined, initializeGrid(1, 1)),
          toggleLife(0, 0)
        ),
        advanceGeneration(),
      )
    ).toEqual(
      {
        grid: new Grid(1, 1),
      }
    )
  });

  it('executes a tick to advance a generation', () => {
    expect(
      gridReducer(
        gridReducer(
          gridReducer(
            gridReducer(undefined, initializeGrid(2, 2)),
            toggleLife(0, 0)
          ),
          toggleLife(1, 0),
        ),
        advanceGeneration(),
      )
    ).toEqual(
      {
        grid: new Grid(2, 2),
      }
    )
  });
});
