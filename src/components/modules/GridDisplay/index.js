import React from 'react';
import { connect } from 'react-redux';

import Cell from '../Cell';

import './style.css';

class GridDisplay extends React.Component {
  renderCells() {
    const { grid } = this.props;
    return grid.flatten().map(
      cell => <Cell
                isAlive = {cell.isAlive}
                x = {cell.x}
                y = {cell.y}
                gridWidth = {grid.horizontalLength}
                gridHeight = {grid.verticalLength}
              />
    );
  };

  render() {
    return (
      <div className="grid">
      </div>
    );
  };
};

export default connect()(GridDisplay);
