import React, { useState, useEffect } from 'react';
import './style.css';

const EARTH = 1;
const WATER = 2;
const GRAVEL = 3;
const SAND = 4;
const CHEST = 7;
const PLAYER = 8;

function Block({ color }) {
  return (
    <div
      style={{
        background: `${color}`,
      }}
    ></div>
  );
}

function renderBlocks(matrix) {
  let colors = {
    [EARTH]: 'green',
    [WATER]: 'blue',
    [GRAVEL]: 'dimgray',
    [SAND]: 'khaki',
    5: 'forestgreen',
    6: 'darkgreen',
    [CHEST]: 'saddlebrown',
    [PLAYER]: 'yellow',
  };

  let blocks = [];
  for (let i = 1; i <= matrix.length; i++) {
    let blocksRow = [];
    for (let j = 1; j <= matrix[0].length; j++) {
      blocksRow.push(<Block color={`${colors[matrix[i - 1][j - 1]]}`} />);
    }
    blocks.push(blocksRow);
  }
  return blocks;
}

function Dialog({ matrix }) {
  return (
    <div
      style={{
        display: 'grid',
        'grid-template-rows': `repeat(${matrix.length}, 50px)`,
        'grid-template-columns': `repeat(${matrix[0].length}, 50px)`,
        position: 'absolute',
      }}
    >
      <div
        style={{
          background: 'gray',
          border: '3px solid black',
          'grid-area': '3 / 3 / span 6 / span 6',
          'z-index': '0',
        }}
      ></div>
      <h1
        style={{
          'grid-area': '4 / 4 / span 2 / span 4',
          'z-index': '1',
        }}
      >
        Congratulations! You passed the first level.
      </h1>
      <button
        style={{
          'grid-area': '7 / 4 / span 1 / span 4',
          'z-index': '1',
        }}
      >
        <h1>Next level</h1>
      </button>
    </div>
  );
}

export default function App() {
  let [matrix, setMatrix] = useState([
    [1, 5, 1, 1, 1, 1, 1, 1, 1, 1],
    [5, 6, 5, 1, 1, 1, 4, 4, 1, 1],
    [1, 5, 1, 1, 2, 2, 2, 4, 1, 1],
    [1, 1, 1, 2, 2, 2, 2, 4, 1, 1],
    [1, 1, 3, 3, 2, 2, 2, 4, 1, 1],
    [1, 1, 1, 3, 3, 4, 4, 4, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 8, 1, 1, 1, 5, 1, 1, 1, 1],
    [1, 1, 1, 1, 5, 6, 5, 1, 7, 1],
    [1, 1, 1, 1, 1, 5, 1, 1, 1, 1],
  ]);

  let [playerY, setPlayerY] = useState(7);
  let [playerX, setPlayerX] = useState(1);

  let [state, setState] = useState('Hello StackBlitz!');

  let [showDialog, setShowDialog] = useState(false);

  const movePlayer = (ver, hor) => {
    if (
      matrix[playerY + ver] == undefined ||
      matrix[playerY + ver][playerX + hor] == undefined
    )
      return;
    if (matrix[playerY + ver][playerX + hor] == EARTH) {
      let newMatrix = [...matrix];
      newMatrix[playerY + ver][playerX + hor] = PLAYER;
      newMatrix[playerY][playerX] = EARTH;
      setPlayerY(playerY + ver);
      setPlayerX(playerX + hor);
      setMatrix(newMatrix);
    }
    if (matrix[playerY + ver][playerX + hor] == CHEST) {
      let newMatrix = [...matrix];
      newMatrix[playerY + ver][playerX + hor] = EARTH;
      setMatrix(newMatrix);
      setShowDialog(true);
    }
  };

  const handler = (event) => {
    event.target.value = '';
    if (event.key == 'w') {
      movePlayer(-1, 0);
    }
    if (event.key == 'd') {
      movePlayer(0, 1);
    }
    if (event.key == 's') {
      movePlayer(1, 0);
    }
    if (event.key == 'a') {
      movePlayer(0, -1);
    }
  };

  return (
    <div>
      {showDialog ? <Dialog matrix={matrix} /> : null}
      <div
        style={{
          display: 'grid',
          'grid-template-rows': `repeat(${matrix.length}, 50px)`,
          'grid-template-columns': `repeat(${matrix[0].length}, 50px)`,
        }}
      >
        {renderBlocks(matrix)}
      </div>
      <input type="text" id="one" onKeyPress={(e) => handler(e)} />
      <h1>{state}</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
