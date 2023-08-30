
import backside from "../images/backside.jpg";

const Box = (props) => {
    
    const picture = props.picture;
    const images = props.images;

    let i = 0;
    let image = "";

    while (i < images.length) {

        if (images[i].id === picture[0]) {
            image = images[i].image;
        }
        
        i++;
    }

    return (

    <div className="box">
        {picture[1] === 0 &&
            <div className="front">
                <img alt="Profile" src={backside} 
                    style={{ width: '100%', height: '90%' }} />
                {picture[0]}
            </div>
        }
        {picture[1] === 1 &&
            <div className="back">
                <img alt="Profile" src={image} 
                    style={{ width: '100%', height: '90%' }} />
                {picture[0]}
            </div>
        }
        {picture[1] === 2 &&
            <div className="backend">
                <img alt="Profile" src={image} 
                    style={{ width: '100%', height: '100%' }} />
            </div>
        }
    </div>    

    )
}

export default Box;
