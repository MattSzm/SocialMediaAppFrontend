import React from "react";
import classes from './Avatar.module.css';


const avatar = (props) => {
    return (
        <div className={classes.Avatar}>
            <img src={props.link}/>
        </div>
    );
}

export default avatar;