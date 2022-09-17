import React, { useState } from 'react';

import Title from './components/Title';
import Banner from './components/Banner';
import Box from './components/Box';

const App = () => {

  const [page, setPage] = useState("start");
  const [level, setLevel] = useState(4);

  const changeLevel = (level) => {
    setLevel(level);
    setPage("game");
  }

  return (

    <div className="mainapp">

      <Title />
      <Banner />

      <div className="main">
        {page === "start" 
          && <div className="startbutton">
            <button onClick={() => setPage("level")}>Start game</button>
          </div>
        }
        {page === "level"
          && <div className="startbutton">
            <h2>Select level:</h2>
            <button onClick={() => changeLevel(4)}>Apprentice</button>
            <button onClick={() => changeLevel(6)}>Knight</button>
            <button onClick={() => changeLevel(8)}>Master</button>
            <button onClick={() => changeLevel(10)}>Grand Master</button>
          </div>
        }
        {page === "game"
          && <div className="boxes">
            <p>Game level: {level}</p>
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
