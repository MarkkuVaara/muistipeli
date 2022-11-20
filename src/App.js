import React, { useState, useEffect } from 'react';

import Title from './components/Title';
import Banner from './components/Banner';
import Box from './components/Box';
import Message from './components/Message';

const App = () => {

  const [page, setPage] = useState("level");
  const [message, setMessage] = useState(null);

  const [level, setLevel] = useState("");
  const [points, setPoints] = useState(0);
  const [gridsize, setGridsize] = useState(4);
  const [grid, setGrid] = useState([]);
  const [lastcard, setLastcard] = useState(-1);

  useEffect(() => {

    const interval = setInterval(() => setPoints(points - 1), 1000);

    return () => clearInterval(interval);

  }, [points]);

  const changeLevel = (level) => {

    setLevel(level);
    if (level === "Apprentice") { 
      setGridsize(4);
      setPoints(50);
     }
    if (level === "Knight") { 
      setGridsize(6);
      setPoints(200);
     }
    if (level === "Master") { 
      setGridsize(8);
      setPoints(800);
     }
    if (level === "Grand Master") { 
      setGridsize(10);
      setPoints(3200);
     }
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

        let id = Math.floor(Math.random() * 100000);
        gridrow[j] = [number, 0, id];

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

        if (grid[i][j][2] === picture[2]) {

          gridcopy[i][j] = picturecopy;

        }

      }

    }

    setGrid(gridcopy);

    if (picture[0] === lastcard) {
      setMessage("Match!");
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    } else {
      setMessage(null);
    }

    setLastcard(picture[0]);

  }

  return (

    <div className="mainapp">

      <Title />
      <Banner level={level} points={points} gridsize={gridsize} />
      <Message message={message} />
      
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
