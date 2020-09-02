import React from "react";
import classes from './AuthButton.module.css';


const authButton = (props) => {
    return(
        <div className={classes.container}
            onClick={props.click}>
            <span className={classes.effect1}>
                {props.children}
                {props.withAnimation ?
                    <span className={classes.bg} /> : null}
            </span>
        </div>
    );
}

export default authButton;