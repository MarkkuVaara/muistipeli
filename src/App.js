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

    setPage("game");

    const gamegrid = [];
    for (let i = 0; i < gridsize; i++) {
      const gridrow = [];
      let number = 1;
      gamegrid[i] = number;
    }
    setGrid(gamegrid);
  
  }

  return (

    <div className="mainapp">

      <Title />
      <Banner level={level} points={points} gridsize={gridsize} />
      {grid}

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
            {Array.from({length: gridsize}, () =>
              <div className="boxrow">
                {Array.from({length: gridsize}, () => 
                  <div onClick={() => setPoints(points - 10)}>
                    <Box />
                  </div>)}
              </div>
            )}
          </div>
        }
      </div>

    </div>
  
  )

};

export default App;
