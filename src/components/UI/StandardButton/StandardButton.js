import React from "react";
import classes from './StandardButton.module.css';


const standardButton = (props) => {
    let classNames = [classes.btn];
    if (props.isGrey){
        classNames.push(classes.btnGrey);
    }
    else if(props.isTransparent){
        classNames.push(classes.btnTransparent);
    }
    return (
        <span className={classNames.join(' ')}
              onClick={props.click}
              {...props.drag}
              style={props.isDragging ? {
                  backgroundColor: '#0890e2'
              } : null}>
            {props.children}
        </span>
    );
}

export default standardButton;