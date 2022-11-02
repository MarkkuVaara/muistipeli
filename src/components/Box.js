
import backside from "../images/backside.jpg";

const Box = (props) => (
    <div className="flip-container">
        <div className="flipper">
        <div className="box">
            <img alt="Profile" src={backside} 
                style={{ width: '100%', height: '100%' }} />
            {props.picture}
        </div>
        </div>
    </div>    
)

export default Box;
