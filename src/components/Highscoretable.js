
const Highscoretable = (props) => {

    const highscores = props.highscores.filter((highscore) => highscore.level === props.level);

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
        </>
    )
}

export default Highscoretable;
