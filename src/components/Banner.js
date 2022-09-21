
const Banner = ({level, points}) => (

    <div className="banner">
        {!level &&
            <p>Level not yet chosen</p>
        }
        {level &&
            <h2>Level: {level}</h2>
        }
        {!level &&
            <p>Points: {points}</p>
        }
        {level &&
            <h2>Points: {points}</h2>
        }
    </div>
)

export default Banner;
