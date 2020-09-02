import React from "react";
import classes from './CloseButton.module.css';

const closeButton = (props) => {
    return(
            <span className={classes.close}
                    onClick={props.clicked}/>
    );
}

export default closeButton;