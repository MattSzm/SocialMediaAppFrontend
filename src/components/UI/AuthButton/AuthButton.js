import React from "react";
import classes from './AuthButton.module.css';


const authButton = (props) => {
    let classNames = [classes.effect1];
    if(props.blackWithSmallScreens){
        classNames = [classes.effect1, classes.black];
    }
    return(
        <div className={classes.container}
            onClick={props.click}>
            <span className={classNames.join(' ')}>
                {props.children}
                <span className={classes.bg} />
            </span>
        </div>
    );
}

export default authButton;