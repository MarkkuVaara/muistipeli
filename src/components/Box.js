
import backside from "../images/backside.jpg";
import memory from "../images/memory.jpg";

const Box = (props) => (
    <div className="flip-container">
        <div className="flipper">
            <div className="box">
                <div className="front">
                    <img alt="Profile" src={backside} 
                        style={{ width: '100%', height: '100%' }} />
                </div>
                <div className="back">
                    <img alt="Profile" src={memory} 
                        style={{ width: '100%', height: '100%' }} />
                </div>
                {props.picture}
            </div>
        </div>
    </div>    
)

export default Box;
