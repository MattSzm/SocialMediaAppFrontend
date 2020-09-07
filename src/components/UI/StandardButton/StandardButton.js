import React from "react";
import classes from './StandardButton.module.css';


const standardButton = (props) => {
    return (
        <span className={classes.btn}
              onClick={props.click}>
            {props.children}
        </span>
    );
}

export default standardButton;