import React from 'react';
import { shallow } from 'enzyme';
import { createMockStore } from 'redux-test-utils';

import GridDisplay from '../GridDisplay';
import Cell from '../Cell';

import GridPrototype from '../../../prototypes/grid';
import shallowWithStore from '../../../test-utils/shallow-with-store';

describe('<GridDisplay />', () => {
  it('renders', () => {
    const testState = {
      grid: {
        grid: new GridPrototype(1, 1),
      }
    }
    const component = shallowWithStore(<GridDisplay />, createMockStore({}));
    expect(component.dive().hasClass('grid')).toBe(true);
  });

  it.skip('has a cell', () => {
    const testState = {
      grid: {
        grid: new GridPrototype(1, 1),
      }
    }
    const component = shallowWithStore(<GridDisplay />, createMockStore(testState));
    expect(component.find('.cell')).toHaveLength(1);
  });
});
