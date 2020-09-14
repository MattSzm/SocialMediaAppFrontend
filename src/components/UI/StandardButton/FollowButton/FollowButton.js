import React from "react";
import classes from './FollowButton.module.css';


const followButton = (props) => {
    let classNames = [classes.Followbtn];
    return (
        <span className={classNames.join(' ')}
              onClick={props.click}
              {...props.drag}
              style={{marginBottom:'1em',
                        width:'5em'}}>
            Follow
        </span>
    );
}

export default followButton;