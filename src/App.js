import React, { useState, useEffect } from 'react';

import Title from './components/Title';
import Banner from './components/Banner';
import Box from './components/Box';
import Message from './components/Message';
import Congrats from './components/Congrats';
import Highscoretable from './components/Highscoretable';
import FileUploader from './components/FileUploader';

import highscoreService from './services/Highscores';
import imageService from './services/Images';
import loginService from './services/Login';

import correct from './sounds/correct.mp3';
import wrong from './sounds/wrong.mp3';
import ching from './sounds/ching.mp3';
import huzzah from './sounds/huzzah.mp3';

const App = () => {

  const [page, setPage] = useState("level");
  const [message, setMessage] = useState(null);
  const [highscores, setHighscores] = useState([]);
  const [images, setImages] = useState([]);

  const [level, setLevel] = useState("");
  const [points, setPoints] = useState(0);
  const [gridsize, setGridsize] = useState(4);
  const [grid, setGrid] = useState([]);
  const [lastcard, setLastcard] = useState(-1);
  const [score, setScore] = useState(0);

  const [user, setUser] = useState(null);
  const [login, setLogin] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [cardflip, setCardflip] = useState(null);

  useEffect(() => {

    setMessage("LOADING IMAGES..");

    imageService
      .getAll()
      .then(response => {
        console.log('Images fetched.');
        setMessage(null);
        setImages(response.data);
      });

    highscoreService
      .getAll()
      .then(response => {
        console.log('Highscores fetched.');
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

    let imagenumber = gridsize * gridsize;
    const filtimages = images.slice(0, imagenumber / 2);

    for (let i = 0; i < gridsize; i++) {

      const gridrow = [];
      for (let j = 0; j < gridsize; j++) {

        while (imagenumber > 0) {

          const randomImage = Math.floor(Math.random() * filtimages.length);
          number = filtimages[randomImage].id;

          if (!pictureset.has(number)) {
            pictureset.add(number);
            imagenumber = imagenumber - 1;
            break;
          } else if (!pictureset2.has(number)) {
            pictureset2.add(number);
            imagenumber = imagenumber - 1;
            break;
          }

        }

        console.log(number);
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

          const audio = new Audio(correct);
          audio.play();

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

        } else {

          const audio = new Audio(wrong);
          audio.play();

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

          setCardflip(picture[2]);
          setTimeout(() => {
            setCardflip(null);
          }, 250);
          setLastcard(-1);
          return;

        }
      }

      const audio = new Audio(ching);
      audio.play();

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

      const audio = new Audio(huzzah);
      audio.play();

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
  };

  const logIn = () => {
    setLogin("visible");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);

    try {
      const user = await loginService.login({
        username, password,
      });
      setUser(user);
      imageService.setToken(user.token);
      setUsername('');
      setPassword('');
    } catch (exception) {
      alert("Wrong credentials!");
    }

  };

  const addImage = (event) => {
    event.preventDefault();
    console.log("Image added..");

    const Image = {
      image: selectedFile
    }

    imageService
      .create(Image)
      .then(response => {
        alert("Image sent!");
      });

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
              {/* <button onClick={() => changeLevel("Grand Master")}>Grand Master</button> */}
            </div>
            <div className="hiddenbutton">
              <button onClick={() => logIn()}>Click</button>
            </div>
            {(login === "visible") && (user === null)
              && <div className="loginform">
              <h2>Secret login</h2>
              <form onSubmit={handleLogin}>
                <div>
                  <p>Username:</p>
                  <input type="text" value={username} name="Username"
                    onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                  <p>Password:</p>
                  <input type="password" value={password} name="Password"
                    onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button type="submit">login</button>
              </form>
            </div>
            }
            {user != null
              && <div>
                <p>You are logged in as {user.username}.</p>
                <form onSubmit={addImage}>
                  <FileUploader onFileSelectSuccess={(file) => setSelectedFile(file)}
                    onFileSelectError={({ error }) => alert(error)} />
                  <button type="submit">Save image</button>
                </form>
                <p>Images in database:</p>
                {images.map(image =>
                  <span className="dbimage">
                    <img src={image.image} alt="" />
                  </span>
                )}
              </div>
            }
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
                    <Box picture={picture} images={images} cardflip={cardflip} />
                  </div>
                )}
              </div>
            )}
            {cardflip === true
              && <p>cardflip!</p>}
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
