import { ACTIONS } from '../../../constants';

export const initializeGrid = (gridX, gridY) => (
  {
    type: ACTIONS.INITIALIZE_GRID,
    payload: {
      gridX,
      gridY
    }
  }
);

export const toggleLife = (cellX, cellY) => (
  {
    type: ACTIONS.TOGGLE_LIFE,
    payload: {
      cellX,
      cellY
    }
  }
);

export const advanceGeneration = () => (
  {
    type: ACTIONS.ADVANCE_GENERATION
  }
);
