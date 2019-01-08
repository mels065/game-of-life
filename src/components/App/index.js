import React, { Component } from 'react';
import './style.css';

import GridDisplay from '../modules/GridDisplay';
import ControlPanel from '../modules/ControlPanel';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GridDisplay />
        <ControlPanel />
      </div>
    );
  }
}

export default App;
