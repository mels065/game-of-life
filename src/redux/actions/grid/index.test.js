import {
  initializeGrid,
  toggleLife,
  advanceGeneration,
  changeIsTicking,
} from '../grid';
import { ACTIONS } from '../../../constants';

describe('initializeGrid', () => {
  it('returns an object', () => {
    expect(typeof initializeGrid(1, 1)).toBe('object');
  });

  it(`returns an object with type ${ACTIONS.INITIALIZE_GRID}`, () => {
    expect(initializeGrid(1, 1).type).toBe(ACTIONS.INITIALIZE_GRID);
  });

  it(`returns a payload object with properties of gridX and gridY`, () => {
    const action = initializeGrid(3, 4);
    expect(action.payload).toEqual({
      gridX: 3,
      gridY: 4,
    });
  });

  it(`returns a payload object with properties of gridX and gridY`, () => {
    const action = initializeGrid(5, 8);
    expect(action.payload).toEqual({
      gridX: 5,
      gridY: 8,
    });
  });
});

describe('toggleLife', () => {
  it('returns an object', () => {
    expect(typeof toggleLife(0, 0)).toBe('object');
  });

  it(`returns an object with type ${ACTIONS.TOGGLE_LIFE}`, () => {
    expect(toggleLife(0, 0).type).toBe(ACTIONS.TOGGLE_LIFE);
  });

  it('returns a payload object with properties of cellX and cellY', () => {
    expect(toggleLife(3, 2).payload).toEqual({
      cellX: 3,
      cellY: 2
    });
  });

  it('returns a payload object with properties of cellX and cellY', () => {
    expect(toggleLife(5, 9).payload).toEqual({
      cellX: 5,
      cellY: 9
    });
  });
});

describe('advanceGeneration', () => {
  it(`returns an object with type ${ACTIONS.ADVANCE_GENERATION}`, () => {
    expect(advanceGeneration().type).toBe(ACTIONS.ADVANCE_GENERATION);
  });
});

describe('changeIsTicking', () => {
  it('returns an object', () => {
    expect(typeof changeIsTicking(true)).toBe('object');
  });

  it(`returns an object with type ${ACTIONS.CHANGE_IS_TICKING}`, () => {
    expect(changeIsTicking(true).type).toBe(ACTIONS.CHANGE_IS_TICKING);
  });

  it(`returns an object with payload object containing isTicking as boolean value`, () => {
    expect(changeIsTicking(true).payload).toEqual({
      isTicking: true,
    })
  });

  it(`returns an object with payload object containing isTicking as boolean value`, () => {
    expect(changeIsTicking(false).payload).toEqual({
      isTicking: false,
    })
  });
});
