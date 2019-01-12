import Grid from '../../../prototypes/grid';

import { ACTIONS } from '../../../constants';

const initialState = {
  grid: new Grid(10, 10),
  isTicking: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.INITIALIZE_GRID: {
      const { gridX, gridY } = action.payload;
      return { ...state, grid: new Grid(gridX, gridY) };
    }
    case ACTIONS.GENERATE_RANDOM_GRID: {
      const { percentage } = action.payload;
      const gridCopy = state.grid.copy().generateRandomGrid(percentage);
      return { ...state, grid: gridCopy };
    }
    case ACTIONS.TOGGLE_LIFE: {
      const { cellX, cellY } = action.payload;
      const gridCopy = state.grid.copy();
      if (gridCopy.getCell(cellX, cellY).isAlive) gridCopy.killCell(cellX, cellY);
      else gridCopy.addLiveCell(cellX, cellY);
      return { ...state, grid: gridCopy };
    }
    case ACTIONS.CHANGE_IS_TICKING: {
      const { isTicking } = action.payload;
      return { ...state, isTicking }
    }
    case ACTIONS.ADVANCE_GENERATION: {
      const gridCopy = state.grid.copy();
      gridCopy.tick();
      return { ...state, grid: gridCopy };
    }
    default: {
      return state;
    }
  }
}
