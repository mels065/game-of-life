import React from 'react';
import renderer from 'react-test-renderer';
import { createMockStore } from 'redux-test-utils';

import shallowWithStore from '../../../test-utils/shallow-with-store';

import GridPrototype from '../../../prototypes/grid';

import { ACTIONS } from '../../../constants';

import Cell from '../Cell';

function createComponent(testState = { grid: { isTicking: false } }, opts = {}, store = null) {
  const newStore = store ? store : createMockStore(testState);
  return shallowWithStore(<Cell {...opts} />, newStore);
}

describe('Cell (component)', () => {
  it('renders', () => {
    expect(createComponent()).toBeTruthy();
  });

  it('has className of "cell"', () => {
    const component = createComponent();
    expect(component.dive().hasClass('cell')).toBe(true);
  });

  it('has a class of "alive" when isAlive is true', () => {
    const component = createComponent(undefined, { isAlive: true })
    expect(component.dive().hasClass('cell alive')).toBe(true)
  });

  it('has a width that conforms to the grid width', () => {
    const component = createComponent(undefined, { gridWidth: 5 });
    expect(component.dive().prop('style').width).toBe('20%');
  });

  it('has a width that conforms to the grid width', () => {
    const component = createComponent(undefined, { gridWidth: 4 });
    expect(component.dive().prop('style').width).toBe('25%');
  });

  it('has a height that conforms to the grid height', () => {
    const component = createComponent(undefined, { gridHeight: 2 });
    expect(component.dive().prop('style').height).toBe('50%');
  });

  it('has a height that conforms to the grid height', () => {
    const component = createComponent(undefined, { gridHeight: 10 });
    expect(component.dive().prop('style').height).toBe('10%');
  });

  it('dispatches `toggleLife` when clicked', () => {
    const testState = {
      grid: {
        grid: new GridPrototype(2, 2),
        isTicking: false,
      }
    }
    const store = createMockStore(testState);
    const component = createComponent(testState, {
      gridWidth: 2,
      gridHeight: 2,
      x: 1,
      y: 1,
    }, store);
    component.dive().find('.cell').simulate('click');
    expect(store.isActionDispatched({
      type: ACTIONS.TOGGLE_LIFE,
      payload: {
        cellX: 1,
        cellY: 1,
      }
    })).toBe(true);
  });

  it('dispatches `toggleLife` when clicked', () => {
    const testState = {
      grid: {
        grid: new GridPrototype(4, 3),
        isTicking: false,
      }
    }
    const store = createMockStore(testState);
    const component = createComponent(testState, {
      gridWidth: 4,
      gridHeight: 3,
      x: 2,
      y: 0,
    }, store);
    component.dive().simulate('click');
    expect(store.isActionDispatched({
      type: ACTIONS.TOGGLE_LIFE,
      payload: {
        cellX: 2,
        cellY: 0,
      }
    })).toBe(true);
  });

  it('cannot be clicked if the game is ticking', () => {
    const testState = {
      grid: {
        grid: new GridPrototype(5, 5),
        isTicking: true,
      }
    }
    const store = createMockStore(testState);
    const component = createComponent(
      testState,
      {
        gridWidth: 5,
        gridHeight: 5,
        x: 2,
        y: 3,
      },
      store,
    );
    component.dive().simulate('click');
    expect(store.getActions().length).toBe(0);
  });
});
