import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleLife } from '../../../redux/actions/grid';

import './style.css';

const Cell = ({ isAlive, gridWidth, gridHeight, isTicking, onClick }) => (
  <div 
    className={`cell${isAlive ? ' alive' : ''} ${!isTicking ? 'selectable' : ''}`}
    onClick={() => { if (!isTicking) onClick() }}
  />
);

const mapStateToProps = state => (
  {
    isTicking: state.grid.isTicking,
  }
)

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    onClick: () => {
      const { x, y } = ownProps;
      dispatch(toggleLife(x, y));
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Cell);

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
