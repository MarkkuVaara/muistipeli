import React, { useState, useEffect } from 'react';

import Title from './components/Title';
import Banner from './components/Banner';
import Box from './components/Box';
import Message from './components/Message';
import Congrats from './components/Congrats';
import Highscoretable from './components/Highscoretable';

import highscoreService from './services/Highscores';
import imageService from './services/Images';

const App = () => {

  const [page, setPage] = useState("level");
  const [message, setMessage] = useState(null);
  const [highscores, setHighscores] = useState([]);

  const [level, setLevel] = useState("");
  const [points, setPoints] = useState(0);
  const [gridsize, setGridsize] = useState(4);
  const [grid, setGrid] = useState([]);
  const [lastcard, setLastcard] = useState(-1);
  const [score, setScore] = useState(0);

  useEffect(() => {

    console.log('Fetching..');
    imageService
      .getAll()
      .then(response => {
        console.log('Promise fulfilled');
        console.log(response.data);
      });

    highscoreService
      .getAll()
      .then(response => {
        console.log('Other promise fulfilled');
        setHighscores(response.data.sort( function(a, b){
          if (a.score > b.score) {return -1;};
          if (a.score < b.score) {return 1;};
          return 0;
          })
        );
      });

  }, []);

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

    let gridcopy = grid;
    let picturecopy = picture;

    if (picturecopy[1] === 0) {

      setPoints(points - 5);
      picturecopy[1] = 1;

      for (let i = 0; i < gridsize; i++) {

        for (let j = 0; j < gridsize; j++) {

          if (grid[i][j][2] === picture[2]) {

            gridcopy[i][j] = picturecopy;

          }

        }

      }

      if (lastcard !== -1) {

        if (picture[0] === lastcard) {

          setMessage("Match!");
          for (let i = 0; i < gridsize; i++) {

            for (let j = 0; j < gridsize; j++) {
  
              if (grid[i][j][2] === picture[2]) {
  
                gridcopy[i][j][1] = 2;
  
              }
              if (grid[i][j][0] === lastcard) {
  
                gridcopy[i][j][1] = 2;
  
              }
  
            }
  
          }

          setPoints(points + 20);
          setTimeout(() => {
            setMessage(null)
          }, 5000);

        } else {

          setMessage("No match");
          for (let i = 0; i < gridsize; i++) {

            for (let j = 0; j < gridsize; j++) {
  
              if (grid[i][j][2] === picture[2]) {
  
                gridcopy[i][j][1] = 0;
  
              }
              if (grid[i][j][0] === lastcard) {
  
                gridcopy[i][j][1] = 0;
  
              }
  
            }
  
          }

          setTimeout(() => {
            setGrid(gridcopy);
            setMessage(null);
          }, 1000);
          setLastcard(-1);
          return;

        }
      }

      setGrid(gridcopy);
      if (lastcard === -1) {
        setLastcard(picture[0]);
      } else {
        setLastcard(-1);
      }
      checkAllCards();

    }

  }

  const checkAllCards = () => {

    let cardcount = 0;

    for (let i = 0; i < gridsize; i++) {

      for (let j = 0; j < gridsize; j++) {

        if (grid[i][j][1] === 2) {

          cardcount = cardcount + 1;

        }

      }

    }

    if (cardcount === gridsize * gridsize) {

      setPage("win");
      setScore(points);

      let hsname = prompt("You have completed game! Insert your name here:", "John Doe"); 

      const Highscore = {
        name: hsname,
        score: points,
        level: level
      };

      setHighscores(highscores.concat(Highscore).sort( function(a, b){
          if (a.score > b.score) {return -1;};
          if (a.score < b.score) {return 1;};
          return 0;
        })
      );

      highscoreService
        .create(Highscore)
        .then(response => {
          console.log('Highscore sent!');
        });

    }

  }

  const newGame = () => {
      setPage("level");
      setPoints(0);
  }

  const logIn = () => {
      alert("Log in");
  }

  return (

    <div className="mainapp">

      <Title />
      <Banner level={level} points={points} gridsize={gridsize} />
      <Message message={message} />
      
      <div className="main">
        {page === "level"
          && <>
            <div className="startbutton">
              <h2>Select level:</h2>
              <button onClick={() => changeLevel("Apprentice")}>Apprentice</button>
              <button onClick={() => changeLevel("Knight")}>Knight</button>
              <button onClick={() => changeLevel("Master")}>Master</button>
              <button onClick={() => changeLevel("Grand Master")}>Grand Master</button>
            </div>
            <div className="hiddenbutton">
              <button onClick={() => logIn()}>Click</button>
            </div>
          </>
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
        {page === "win"
          && <div>
            <div className="win">
              <Congrats score={score} />
              <button onClick={() => newGame()}>New game</button>
            </div>
            <Highscoretable highscores={highscores} level={level} />
          </div>
        }
      </div>

    </div>
  
  )

};

export default App;
