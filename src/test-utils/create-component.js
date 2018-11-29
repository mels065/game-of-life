import React from 'react';
import { createMockStore } from 'redux-test-utils';

import shallowWithStore from './shallow-with-store';

export default function createComponent(component, testState = { grid: { isTicking: false } }, opts = {}, store = null) {
  const newStore = store ? store : createMockStore(testState);
  return shallowWithStore(<component {...opts} />, newStore);
}