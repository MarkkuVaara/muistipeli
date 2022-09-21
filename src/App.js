import React, { useState } from 'react';

import Title from './components/Title';
import Banner from './components/Banner';
import Box from './components/Box';

const App = () => {

  const [page, setPage] = useState("start");
  const [level, setLevel] = useState("");
  const [points, setPoints] = useState(0);

  const changeLevel = (level) => {
    setLevel(level);
    setPoints(1000);
    setPage("game");
  }

  return (

    <div className="mainapp">

      <Title />
      <Banner level={level} points={points} />

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
            <div className="boxrow">
              <Box /> <Box /> <Box /> <Box />
            </div>
            <div className="boxrow">
              <Box /> <Box /> <Box /> <Box />
            </div>
            <div className="boxrow">
              <Box /> <Box /> <Box /> <Box />
            </div>
            <div className="boxrow">
              <Box /> <Box /> <Box /> <Box />
            </div>
          </div>
        }
      </div>

    </div>
  
  )

};

export default App;
