
const Banner = ({level, points, gridsize}) => (

    <div className="banner">
        {!level &&
            <p>Level not yet chosen</p>
        }
        {level &&
            <h2>Level: {level} ({gridsize} x {gridsize})</h2>
        }
        {!level &&
            <p>Points: 0</p>
        }
        {level &&
            <h2>Points: {points}</h2>
        }
    </div>
)

export default Banner;
