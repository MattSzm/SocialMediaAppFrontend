import React from "react";
import classes from './UnauthorizedWrapper.module.css';


const unauthorizedWrapper = (props) => {
    return (
        <div className={classes.Container}>
            {props.children}
        </div>
    );
}


export default unauthorizedWrapper;