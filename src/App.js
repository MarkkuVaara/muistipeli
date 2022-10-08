import React, { useState } from 'react';

import Title from './components/Title';
import Banner from './components/Banner';
import Box from './components/Box';

const App = () => {

  const [page, setPage] = useState("start");
  const [level, setLevel] = useState("");
  const [points, setPoints] = useState(0);
  const [grid, setGrid] = useState(0);
  const [message, setMessage] = useState("");

  const changeLevel = (level) => {
    setLevel(level);
    if (level === "Apprentice") {
      setGrid(4);
    }
    if (level === "Knight") {
      setGrid(6);
    }
    if (level === "Master") {
      setGrid(8);
    }
    if (level === "Grand Master") {
      setGrid(10);
    }
    setPoints(1000);
    setPage("game");
  }

  return (

    <div className="mainapp">

      <Title />
      <Banner level={level} points={points} grid={grid} />

      <div className="main">
        {page === "start" 
          && <div className="startbutton">
            <button onClick={() => setPage("level")}>Start game</button>
          </div>
        }
        {page === "level"
          && <div className="startbutton">
            <h2>Select level:</h2>
            <button onClick={() => changeLevel("Apprentice")}>Apprentice</button>
            <button onClick={() => changeLevel("Knight")}>Knight</button>
            <button onClick={() => changeLevel("Master")}>Master</button>
            <button onClick={() => changeLevel("Grand Master")}>Grand Master</button>
          </div>
        }
        {page === "game"
          && <div className="boxes">
            {Array.from({length: grid}, () =>
              <div className="boxrow">
                {Array.from({length: grid}, () => <div onClick={() => setPoints(points - 10)}> <Box /> </div>)}
              </div>
            )}
          </div>
        }
      </div>

    </div>
  
  )

};

export default App;
