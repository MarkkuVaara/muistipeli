
import React from 'react';
import Confetti from 'react-confetti';
// import useWindowSize from 'react-use/lib/useWindowSize';

const Highscoretable = (props) => {

    const highscores = props.highscores.filter((highscore) => highscore.level === props.level);

//    const { width, height } = useWindowSize();

    return (
        <>
        <div className="highscores">
            <h2>Highscores ({props.level} level):</h2>
        </div>
        {highscores.map(highscore => 
            <div className="highscore_container">
                <div className="highscore1">
                    <b>{highscore.name}</b>
                </div>
                <div className="highscore2">
                    <b>{highscore.score}</b>
                </div>
            </div>
        )}
        <div className="highscoreend">
        </div>
        <Confetti
            width={window.width}
            height={window.height}
            confettiSource={[50, 50, 100, 100]}
            opacity={0.8}
            initialVelocityX={10}
            initialVelocityY={10}
            friction={1.0}
            numberOfPieces={400}
        />
        </>
    )
}

export default Highscoretable;
