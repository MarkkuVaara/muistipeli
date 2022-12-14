
import backside from "../images/backside.jpg";
import memory from "../images/memory.jpg";

const Box = (props) => {
    
    const picture = props.picture;

    return (

    <div className="box">
        {picture[1] === 0 &&
            <div className="front">
                <img alt="Profile" src={backside} 
                    style={{ width: '100%', height: '100%' }} />
            </div>
        }
        {picture[1] === 1 &&
            <div className="back">
                <img alt="Profile" src={memory} 
                    style={{ width: '100%', height: '100%' }} />
                {picture[0]}
            </div>
        }
    </div>    

    )
}

export default Box;
