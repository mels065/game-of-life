import React from 'react';
import { createMockStore } from 'redux-test-utils';

import shallowWithStore from '../../../test-utils/shallow-with-store';
import renderWithRedux from '../../../test-utils/render-with-redux';

import GridPrototype from '../../../prototypes/grid';

import { ACTIONS } from '../../../constants';

import Cell from '../Cell';

function createComponent(testState = { grid: { isTicking: false } }, opts = {}, store = null) {
  const newStore = store ? store : createMockStore(testState);
  return shallowWithStore(<Cell {...opts} />, newStore);
}

describe('Cell (component)', () => {
  it('renders', () => {
    expect(createComponent().dive().hasClass('cell')).toBe(true);
  });

  it('has a class of "alive" when isAlive is true', () => {
    const component = createComponent(undefined, { isAlive: true })
    expect(component.dive().hasClass('cell alive')).toBe(true)
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

  it('has `.selectable` added as a class when not ticking', () => {
    const testState = {
      grid: {
        grid: new GridPrototype(5, 5),
        isTicking: false,
      }
    };
    const { container } = renderWithRedux(
      <Cell
        x={0}
        y={0}
      />,
      testState
    );
    expect(container.querySelector('.cell').classList).toContain('selectable');
  });

  it('does not have `.selectable` added as a class when ticking', () => {
    const testState = {
      grid: {
        grid: new GridPrototype(5, 5),
        isTicking: true,
      }
    };
    const { container } = renderWithRedux(
      <Cell
        x={0}
        y={0}
      />,
      testState
    );
    let doesContain = false;
    for (let className of container.querySelector('.cell').classList) {
      if (className === 'selectable') doesContain = true;
    }
    expect(doesContain).toBe(false);
  });
});
