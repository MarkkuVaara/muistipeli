
const Congrats = (props) => {

    return (
        <div className="win">
            <h1>You WON!</h1>
            <h2>Your final score: {props.score}</h2>
        </div>
    )

}

export default Congrats;
