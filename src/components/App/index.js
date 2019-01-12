import React, { Component } from 'react';
import './style.css';

import GridDisplay from '../modules/GridDisplay';
import ControlPanel from '../modules/ControlPanel';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>Game of Life</h1>
          <h2>Play with different grid configurations</h2>
        </header>
        <main>
          <GridDisplay />
          <ControlPanel />
          <div className="rules">
            <h2>Rules</h2>
            <ol>
              <li>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</li>
              <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
              <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
              <li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
            </ol>
          </div>
        </main>
        <footer>
          <h3>&copy; Brandon Mellus 2019</h3>
        </footer>
      </div>
    );
  }
}

export default App;
