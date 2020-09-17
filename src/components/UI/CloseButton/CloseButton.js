import React from "react";
import classes from './CloseButton.module.css';

const closeButton = (props) => {
    let className = classes.close;
    if(props.post){
        className = classes.postClose;
    }
    return(
            <span className={className}
                    onClick={props.clicked}/>
    );
}

export default closeButton;