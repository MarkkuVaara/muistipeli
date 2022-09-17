import React, { useState } from 'react';

import Title from './components/Title';
import Banner from './components/Banner';
import Box from './components/Box';

const App = () => {

  const [page, setPage] = useState("start");
  const [level, setLevel] = useState("");

  const changeLevel = (level) => {
    setLevel(level);
    setPage("game");
  }

  return (

    <div className="mainapp">

      <Title />
      <Banner level={level} />

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
            <Box />
            <Box />
            <Box />
          </div>
        }
      </div>

    </div>
  
  )

};

export default App;
