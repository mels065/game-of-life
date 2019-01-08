import React from 'react';
import { connect } from 'react-redux';

import Cell from '../Cell';

import './style.css';

class GridDisplay extends React.Component {
  renderCells() {
    const { grid } = this.props;
    return grid.flatten().map(
      cell => <Cell
                key={`(${cell.x}),${cell.y}`}
                isAlive = {cell.isAlive}
                x = {cell.x}
                y = {cell.y}
                gridWidth = {grid.horizontalLength}
                gridHeight = {grid.verticalLength}
              />
    );
  };

  render() {
    const { grid: {
      horizontalLength,
      verticalLength,
    } } = this.props;

    const style = {
      gridTemplateColumns: Array(horizontalLength).fill('1fr').join(' '),
      gridTemplateRows: Array(verticalLength).fill('1fr').join(' '),
    };
    return (
      <div className="grid" style={style}>
        {this.renderCells()}
      </div>
    );
  };
};

const mapStateToProps = state => ({
  grid: state.grid.grid,
})

export default connect(mapStateToProps)(GridDisplay);