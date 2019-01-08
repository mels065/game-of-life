import React from 'react';
import { fireEvent } from 'react-testing-library';
import { createMockStore } from 'redux-test-utils';

import ControlPanel from '../ControlPanel';
import GridPrototype from '../../../prototypes/grid';

import renderWithRedux from '../../../test-utils/render-with-redux';

import { ACTIONS, TEXT } from '../../../constants';

import 'jest-dom/extend-expect';
import { Action } from 'rxjs/internal/scheduler/Action';

describe('<ControlPanel />', () => {
  let testState;
  beforeEach(() => {
    testState = {
      grid: {
        isTicking: false,
        grid: new GridPrototype(1, 1),
      }
    };
  });

  it('renders', () => {
    const { container } = renderWithRedux(<ControlPanel />, testState);
    expect(container.querySelector('.control-panel')).toBeInTheDocument();
  });

  it('dispatches `INITIALIZE_GRID` when the Width field is changed', () => {
    const store = createMockStore(testState);
    const { container } = renderWithRedux(<ControlPanel />, testState, store);
    fireEvent.change(container.querySelector('.width-field'), { target: { value: 2 } });
    expect(store.isActionDispatched({
      type: ACTIONS.INITIALIZE_GRID,
      payload: {
        gridX: 2,
        gridY: 1,
      }
    })).toBe(true);
  });

  it('dispatches `INITIALIZE_GRID` when the Width field is changed', () => {
    const store = createMockStore(testState);
    const { container } = renderWithRedux(<ControlPanel />, testState, store);
    fireEvent.change(container.querySelector('.width-field'), { target: { value: 5 } });
    fireEvent.input(container.querySelector('.width-field'), { target: { value: 5 } });
    expect(store.isActionDispatched({
      type: ACTIONS.INITIALIZE_GRID,
      payload: {
        gridX: 5,
        gridY: 1,
      }
    })).toBe(true);
  });

  it('has minimum limit of 1 for the width input', () => {
    const { container } = renderWithRedux(<ControlPanel />, testState);
    const widthField = container.querySelector('.width-field');
    expect(widthField.getAttribute('min')).toBe("1");
  });

  it('has maximum limit of 30 for the width input', () => {
    const { container } = renderWithRedux(<ControlPanel />, testState);
    const widthField = container.querySelector('.width-field');
    expect(widthField.getAttribute('max')).toBe("30");
  });

  it('dispatches `INITIALIZE_GRID` when the Height field is changed', () => {
    const store = createMockStore(testState);
    const { container } = renderWithRedux(<ControlPanel />, testState, store);
    fireEvent.change(container.querySelector('.height-field'), { target: { value: 2 } });
    fireEvent.input(container.querySelector('.height-field'), { target: { value: 2 } });
    expect(store.isActionDispatched({
      type: ACTIONS.INITIALIZE_GRID,
      payload: {
        gridX: 1,
        gridY: 2,
      }
    })).toBe(true);
  });

  it('dispatches `INITIALIZE_GRID` when the Height field is changed', () => {
    const store = createMockStore(testState);
    const { container } = renderWithRedux(<ControlPanel />, testState, store);
    fireEvent.change(container.querySelector('.height-field'), { target: { value: 4 } });
    fireEvent.input(container.querySelector('.height-field'), { target: { value: 4 } });
    expect(store.isActionDispatched({
      type: ACTIONS.INITIALIZE_GRID,
      payload: {
        gridX: 1,
        gridY: 4,
      }
    })).toBe(true);
  });

  it('has minimum limit of 1 for the height input', () => {
    const { container } = renderWithRedux(<ControlPanel />, testState);
    const heightField = container.querySelector('.height-field');
    expect(heightField.getAttribute('min')).toBe("1");
  });

  it('has maximum limit of 30 for the height input', () => {
    const { container } = renderWithRedux(<ControlPanel />, testState);
    const heightField = container.querySelector('.height-field');
    expect(heightField.getAttribute('max')).toBe("30");
  });

  it('advances the grid by a tick when the `Step` button is clicked', () => {
    const store = createMockStore(testState);
    const { container } = renderWithRedux(<ControlPanel />, testState, store);
    fireEvent.click(container.querySelector('.step-btn'));
    expect(store.isActionDispatched({
      type: ACTIONS.ADVANCE_GENERATION,
    })).toBe(true)
  });

  it('turns `Start` button to `Stop` when clicked', () => {
    const { container } = renderWithRedux(<ControlPanel />, testState);
    const btn = container.querySelector('.tick-btn');
    fireEvent.click(btn);
    expect(btn.textContent).toBe(TEXT.BTN.STOP);
  });

  it('turns `Stop` button to `Start` when clicked', () => {
    testState.grid.isTicking = true;
    const { container } = renderWithRedux(<ControlPanel />, testState);
    const btn = container.querySelector('.tick-btn');
    fireEvent.click(btn);
    expect(btn.textContent).toBe(TEXT.BTN.START);
  });

  it('switches `isTicking` to true when the `Start` button is clicked', () => {
    const store = createMockStore(testState);
    const { container } = renderWithRedux(<ControlPanel />, testState, store);
    const btn = container.querySelector('.tick-btn');
    fireEvent.click(btn);
    expect(store.isActionDispatched({
      type: ACTIONS.CHANGE_IS_TICKING,
      payload: {
        isTicking: true,
      },
    })).toBe(true);
  });

  it('switches `isTicking` to false when the `Stop` button is clicked', () => {
    testState.grid.isTicking = true;
    const store = createMockStore(testState);
    const { container } = renderWithRedux(<ControlPanel />, testState, store);
    const btn = container.querySelector('.tick-btn');
    fireEvent.click(btn);
    expect(store.isActionDispatched({
      type: ACTIONS.CHANGE_IS_TICKING,
      payload: {
        isTicking: false,
      },
    })).toBe(true);
  });
  
  it('prevents other buttons and inputs from being interacted with when ticking', () => {
    testState.grid.isTicking = true;
    const { container } = renderWithRedux(<ControlPanel />, testState);
    
    expect(container.querySelector('.width-field').hasAttribute('disabled')).toBe(true);
    expect(container.querySelector('.height-field').hasAttribute('disabled')).toBe(true);
    expect(container.querySelector('.random-generate-btn').hasAttribute('disabled')).toBe(true);
    expect(container.querySelector('.rand-percent-field').hasAttribute('disabled')).toBe(true);
    expect(container.querySelector('.step-btn').hasAttribute('disabled')).toBe(true);
  });

  it('sets an interval timer when `Tick` button is clicked', () => {
    jest.useFakeTimers();

    const { container } = renderWithRedux(<ControlPanel />, testState);
    fireEvent.click(container.querySelector('.tick-btn'));
    expect(setInterval).toHaveBeenCalled();

    jest.useRealTimers();
  });

  it('clears the interval when `Tick` button is clicked again', () => {
    jest.useFakeTimers();

    testState.grid.isTicking = true;
    const { container } = renderWithRedux(<ControlPanel />, testState);
    const btn = container.querySelector('.tick-btn');
    fireEvent.click(btn);
    expect(clearInterval).toHaveBeenCalled();

    jest.useRealTimers();
  });

  it('has the interval call `ADVANCE_GENERATION`', () => {
    jest.useFakeTimers();

    const store = createMockStore(testState);
    const { container } = renderWithRedux(<ControlPanel />, testState, store);
    const btn = container.querySelector('.tick-btn');
    fireEvent.click(btn);

    jest.advanceTimersByTime(3000);
    const counter = store.getActions().reduce(
      (total, action) => action.type === ACTIONS.ADVANCE_GENERATION ? total + 1 : total,
      0
    );

    expect(counter).toBe(3);

    jest.useRealTimers();
  });

  it(`dispatches ${ACTIONS.GENERATE_RANDOM_GRID} when \`Generate Random Grid\` is clicked`, () => {
    const store = createMockStore(testState);
    const { container } = renderWithRedux(<ControlPanel />, testState, store);
    const btn = container.querySelector('.random-generate-btn');
    fireEvent.click(btn);
    expect(store.isActionDispatched({
      type: ACTIONS.GENERATE_RANDOM_GRID,
      payload: {
        percentage: 50
      }
    })).toBe(true);
  });

  it('changes the percentage value given to `Generate Random Grid` when `Life Rate` field is changed', () => {
    const store = createMockStore(testState);
    const { container } = renderWithRedux(<ControlPanel />, testState, store);
    const btn = container.querySelector('.random-generate-btn');
    const field = container.querySelector('.rand-percent-field');
    fireEvent.change(field, { target: { value: 10 } });
    fireEvent.input(field, { target: { value: 10 } });
    fireEvent.click(btn);
    expect(store.isActionDispatched({
      type: ACTIONS.GENERATE_RANDOM_GRID,
      payload: {
        percentage: 10
      }
    })).toBe(true);
  });
});
