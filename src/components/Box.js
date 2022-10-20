
import backside from "../images/backside.jpg";

const Box = (props) => (
    <div className="box">
        <img alt="Profile" src={backside} 
            style={{ width: '100%', height: '100%' }} />
        {props.picture}
    </div>    
)

export default Box;
