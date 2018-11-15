import React from 'react';
import renderer from 'react-test-renderer';

import Cell from '../Cell';

describe('Cell (component)', () => {
  it('renders', () => {
    expect(renderer.create(<Cell />)).toBeTruthy();
  });

  it('has className of "cell"', () => {
    const component = renderer.create(<Cell />);
    expect(component.toJSON().props.className).toBe('cell');
  });

  it('has a class of "alive" when isAlive is true', () => {
    const component = renderer.create(<Cell isAlive={true} />)
    expect(component.toJSON().props.className).toBe('cell alive')
  });

  it('has a width that conforms to the grid width', () => {
    const component = renderer.create(<Cell gridWidth={5} />);
    expect(component.toJSON().props.style.width).toBe('20%');
  });

  it('has a width that conforms to the grid width', () => {
    const component = renderer.create(<Cell gridWidth={4} />);
    expect(component.toJSON().props.style.width).toBe('25%');
  });

  it('has a height that conforms to the grid height', () => {
    const component = renderer.create(<Cell gridHeight={2} />);
    expect(component.toJSON().props.style.height).toBe('50%');
  });

  it('has a height that conforms to the grid height', () => {
    const component = renderer.create(<Cell gridHeight={10} />);
    expect(component.toJSON().props.style.height).toBe('10%');
  });
});
