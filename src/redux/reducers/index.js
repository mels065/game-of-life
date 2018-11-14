import { combineReducers } from 'redux';

import gridReducer from './grid';

export default combineReducers({
  grid: gridReducer,
});
