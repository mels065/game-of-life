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

export const generateRandomGrid = (percentage = 50) => (
  {
    type: ACTIONS.GENERATE_RANDOM_GRID,
    payload: {
      percentage,
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

export const changeIsTicking = (isTicking) => (
  {
    type: ACTIONS.CHANGE_IS_TICKING,
    payload: {
      isTicking,
    }
  }
);

export const resetGrid = () => (
  {
    type: ACTIONS.RESET_GRID,
  }
);
