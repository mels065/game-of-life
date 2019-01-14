import React from 'react';
import { connect } from 'react-redux';

import {
  initializeGrid,
  advanceGeneration,
  changeIsTicking,
  generateRandomGrid
} from '../../../redux/actions/grid';
import { TEXT } from '../../../constants';

import './style.css';

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      btnText: TEXT.BTN.START,
      percentage: 50,
      timer: null,
    };
    this.toggleTicking = this.toggleTicking.bind(this);
  }

  toggleTicking() {
    const {
      isTicking,
      changeIsTickingOnClick,
      advanceGenerationCallback,
    } = this.props;
    const { timer } = this.state;
    if (!isTicking) {
      this.setState({
        btnText: TEXT.BTN.STOP,
        timer: setInterval(advanceGenerationCallback, 500)
      });
      changeIsTickingOnClick(true);
    }
    else {
      clearInterval(timer);
      this.setState({
        btnText: TEXT.BTN.START,
        timer: null,
      });
      changeIsTickingOnClick(false);
    }
  }

  render() {
    const {
      grid,
      initializeGridOnChange,
      advanceGenerationCallback,
      generateRandomGridOnClick,
      isTicking
    } = this.props;
    const { btnText } = this.state;

    return (
      <div className="control-panel">
        <div className="sub-panel grid-manip-panel">
          <label>Width&nbsp;
            <input
              className="grid-manip-field width-field"
              type="number"
              min="1"
              max="30"
              onChange={(event) => {
                initializeGridOnChange(
                  Number(event.target.value),
                  grid.verticalLength,
                );
              }}
              onInput={(event) => {
                initializeGridOnChange(
                  Number(event.target.value),
                  grid.verticalLength,
                );
              }}
              disabled={isTicking}
              value={grid.horizontalLength}
            />
          </label>

          <label>Height&nbsp;
            <input
              className="grid-manip-field height-field"
              type="number"
              min="1"
              max="30"
              onChange={(event) => {
                initializeGridOnChange(
                  grid.horizontalLength,
                  Number(event.target.value)
                );
              }}
              onInput={(event) => {
                initializeGridOnChange(
                  grid.horizontalLength,
                  Number(event.target.value)
                );
              }}
              disabled={isTicking}
              value={grid.verticalLength}
            />
          </label>
        </div>
        <div className="sub-panel random-gen-panel">
          <button
              className="random-generate-btn"
              onClick={() => {
                generateRandomGridOnClick(this.state.percentage)
              }}
              disabled={isTicking}
            >
              Generate Random Grid
          </button>
          <label>Life Rate&nbsp;
            <input
              className="rand-percent-field"
              type="number"
              min="0"
              max="100"
              onChange={(event) => {
                this.setState({
                  percentage: Number(event.target.value),
                });
              }}
              onInput={(event) => {
                this.setState({
                  percentage: Number(event.target.value),
                });
              }}
              disabled={isTicking}
              value={this.state.percentage}
            /><span className="percent-sign">%</span>
          </label>
        </div>
        <div className="sub-panel btns-panel">
          <button
            className="step-btn"
            onClick={advanceGenerationCallback}
            disabled={isTicking}
          >
            Step
          </button>
          <button className="tick-btn" onClick={this.toggleTicking}>{btnText}</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  grid: state.grid.grid,
  isTicking: state.grid.isTicking,
})

const mapDispatchToProps = dispatch => ({
  initializeGridOnChange: (x, y) => {
    dispatch(initializeGrid(x, y));
  },

  advanceGenerationCallback: () => {
    dispatch(advanceGeneration());
  },

  changeIsTickingOnClick: (isTicking) => {
    dispatch(changeIsTicking(isTicking));
  },

  generateRandomGridOnClick: (percentage) => {
    dispatch(generateRandomGrid(percentage))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
