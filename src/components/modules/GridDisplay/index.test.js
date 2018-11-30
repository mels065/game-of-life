import React from 'react';
import { shallow } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { render } from 'react-testing-library';

import 'jest-dom/extend-expect';

import GridDisplay from '../GridDisplay';
import Cell from '../Cell';

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
});
