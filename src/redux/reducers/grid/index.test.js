import gridReducer from '../grid';

import Grid from '../../../prototypes/grid';

import {
  initializeGrid,
  toggleLife,
  advanceGeneration,
  changeIsTicking,
  generateRandomGrid,
} from '../../actions/grid';

import { ACTIONS } from '../../../constants';

import { useFakeRandom, useRealRandom } from '../../../test-utils/random';

describe('gridReducer', () => {
  it('returns the default state', () => {
    expect(gridReducer(undefined, {})).toEqual({
      grid: new Grid(10, 10),
      isTicking: false,
    });
  });

  it(`creates a new grid when the action type is ${ACTIONS.INITIALIZE_GRID}`, () => {
    expect(gridReducer(undefined, initializeGrid(3, 3))).toEqual({
      grid: new Grid(3, 3),
      isTicking: false,
    })
  });

  it(`creates a new grid when the action type is ${ACTIONS.INITIALIZE_GRID}`, () => {
    expect(gridReducer(undefined, initializeGrid(5, 2))).toEqual({
      grid: new Grid(5, 2),
      isTicking: false,
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
        isTicking: false,
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
        isTicking: false,
      }
    )
  });

  it('changes `isTicking` to true', () => {
    expect(gridReducer(undefined, changeIsTicking(true)).isTicking).toBe(true);
  });

  it('changes `isTicking` to false', () => {
    expect(gridReducer(undefined, changeIsTicking(false)).isTicking).toBe(false);
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
        isTicking: false,
      }
    )
  });

  it(`calls \`generateRandom\` when ${ACTIONS.GENERATE_RANDOM_GRID} is dispatched`, () => {
    useFakeRandom();
    
    const expectedGrid = new Grid(10, 10);
    let makeAlive = false;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (makeAlive) expectedGrid.addLiveCell(j, i);
        makeAlive = !makeAlive;
      }
    }

    expect(gridReducer(undefined, generateRandomGrid()))
      .toEqual(
        {
          grid: expectedGrid,
          isTicking: false,
        }
      );
    
    useRealRandom();
  });

  it(`passes an argument for \`percentage\` value for ${ACTIONS.GENERATE_RANDOM_GRID}`, () => {
    const generateRandomSpy = jest.spyOn(Grid.prototype, 'generateRandomGrid');
    gridReducer(undefined, generateRandomGrid(30));
    expect(generateRandomSpy).toBeCalledWith(30);
  });
});
