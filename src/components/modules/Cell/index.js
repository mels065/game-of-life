import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Cell = ({ isAlive, gridWidth, gridHeight }) => (
  <div 
    className={`cell${isAlive ? ' alive' : ''}`}
    style={{
      width: `${100 / (gridWidth ? gridWidth : 1)}%`,
      height: `${100 / (gridHeight ? gridHeight : 1)}%`,
    }}
  />
);

export default Cell

Cell.propTypes = {
  isAlive: PropTypes.bool,
  gridWidth: PropTypes.number,
  gridHeight: PropTypes.number,
};

Cell.defaultProps = {
  isAlive: false,
  gridWidth: 0,
  gridHeight: 0,
};
