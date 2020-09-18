import React from "react";
import classes from './PostImage.module.css';

const postImage = (props) => {
    return (
        <div className={classes.Image}>
            <img src={props.link} />
        </div>
    );
};

export default postImage;