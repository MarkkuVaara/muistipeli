
const Banner = ({level}) => (

    <div className="banner">
        {!level &&
            <p>Level not yet chosen</p>
        }
        {level &&
            <h2>Level: {level}</h2>
        }
        {!level &&
            <p>Points: 0</p>
        }
        {level &&
            <h2>Points: 0</h2>
        }
    </div>
)

export default Banner;
