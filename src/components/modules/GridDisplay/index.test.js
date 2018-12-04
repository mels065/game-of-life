import React from 'react';

import 'jest-dom/extend-expect';

import GridDisplay from '../GridDisplay';

import GridPrototype from '../../../prototypes/grid';
import renderWithRedux from '../../../test-utils/render-with-redux';

describe('<GridDisplay />', () => {
  it('renders', () => {
    const testState = {
      grid: {
        grid: new GridPrototype(1, 1),
      }
    }
    const { container } = renderWithRedux(<GridDisplay />, testState);
    expect(container.querySelector('.grid')).toBeInTheDocument();
  });

  it('has a cell', () => {
    const testState = {
      grid: {
        grid: new GridPrototype(1, 1),
      }
    };
    const { container } = renderWithRedux(<GridDisplay />, testState);
    expect(container.querySelectorAll('.cell').length).toBe(1);
  });

  it('has multiple cells', () => {
    const testState = {
      grid: {
        grid: new GridPrototype(2, 2),
      }
    };
    const { container } = renderWithRedux(<GridDisplay />, testState);
    expect(container.querySelectorAll('.cell').length).toBe(4);
  });

  it('has a `grid-template-columns` style property dependent on the dimensions of the grid', () => {
    const testState = {
      grid: {
        grid: new GridPrototype(1, 1),
      }
    };
    const { container } = renderWithRedux(<GridDisplay />, testState);
    expect(container.querySelector('.grid').style.gridTemplateColumns).toBe('1fr');
  });

  it('has a `grid-template-columns` style property dependent on the dimensions of the grid', () => {
    const testState = {
      grid: {
        grid: new GridPrototype(2, 2),
      }
    };
    const { container } = renderWithRedux(<GridDisplay />, testState);
    expect(container.querySelector('.grid').style.gridTemplateColumns).toBe('1fr 1fr');
  });

  it('has a `grid-template-rows` style property dependent on the dimensions of the grid', () => {
    const testState = {
      grid: {
        grid: new GridPrototype(1, 1),
      }
    };
    const { container } = renderWithRedux(<GridDisplay />, testState);
    expect(container.querySelector('.grid').style.gridTemplateRows).toBe('1fr');
  });

  it('has a `grid-template-rows` style property dependent on the dimensions of the grid', () => {
    const testState = {
      grid: {
        grid: new GridPrototype(3, 3),
      }
    };
    const { container } = renderWithRedux(<GridDisplay />, testState);
    expect(container.querySelector('.grid').style.gridTemplateRows).toBe('1fr 1fr 1fr');
  });
});
