import React, { useState } from 'react';

import Title from './components/Title';
import Banner from './components/Banner';
import Box from './components/Box';

const App = () => {

  const [page, setPage] = useState("level");
  const [message, setMessage] = useState("");

  const [level, setLevel] = useState("");
  const [points, setPoints] = useState(0);
  const [gridsize, setGridsize] = useState(4);
  const [grid, setGrid] = useState([]);

  const changeLevel = (level) => {

    setLevel(level);
    if (level === "Apprentice") { setGridsize(4); }
    if (level === "Knight") { setGridsize(6); }
    if (level === "Master") { setGridsize(8); }
    if (level === "Grand Master") { setGridsize(10); }
    setPoints(1000);
    setPage("start");

  }

  const startGame = () => {

    const gamegrid = [];
    let number;

    const pictureset = new Set();
    const pictureset2 = new Set();

    for (let i = 0; i < gridsize; i++) {

      const gridrow = [];
      for (let j = 0; j < gridsize; j++) {

        while (true) {

          number = Math.floor(Math.random() * (gridsize * gridsize / 2));
          if (!pictureset.has(number)) {
            pictureset.add(number);
            break;
          } else if (!pictureset2.has(number)) {
            pictureset2.add(number);
            break;
          }

        }

        gridrow[j] = [number, 0];

      }

      gamegrid[i] = gridrow;

    }

    console.log(pictureset);

    setGrid(gamegrid);
    setPage("game");
  
  }

  const checkCard = (picture) => {

    setPoints(points - picture[0]);

    let gridcopy = grid;
    let picturecopy = picture;
    picturecopy[1] = 1;
    
    for (let i = 0; i < gridsize; i++) {

      for (let j = 0; j < gridsize; j++) {

        if (grid[i][j][0] == picture[0]) {

          gridcopy[i][j] = picturecopy;

        }

      }

    }

    setGrid(gridcopy);

  }

  return (

    <div className="mainapp">

      <Title />
      <Banner level={level} points={points} gridsize={gridsize} />

      <div className="main">
        {page === "level"
          && <div className="startbutton">
            <h2>Select level:</h2>
            <button onClick={() => changeLevel("Apprentice")}>Apprentice</button>
            <button onClick={() => changeLevel("Knight")}>Knight</button>
            <button onClick={() => changeLevel("Master")}>Master</button>
            <button onClick={() => changeLevel("Grand Master")}>Grand Master</button>
          </div>
        }
        {page === "start" 
          && <div className="startbutton">
            <button onClick={() => startGame()}>Start game</button>
          </div>
        }
        {page === "game"
          && <div className="boxes">
            {grid.map(gridrow =>
              <div className="boxrow">
                {gridrow.map(picture => 
                  <div onClick={() => checkCard(picture)}>
                    <Box picture={picture} />
                  </div>
                )}
              </div>
            )}
          </div>
        }
      </div>

    </div>
  
  )

};

export default App;
