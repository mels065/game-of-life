import React, { Component } from 'react';
import './style.css';

import Cell from '../modules/Cell';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Cell gridWidth={2} gridHeight={2} />
      </div>
    );
  }
}

export default App;
