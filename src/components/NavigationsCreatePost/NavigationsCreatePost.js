import React from "react";
import classes from './NavigationsCreatePost.module.css';
import Button from "../UI/StandardButton/StandardButton";

const navigationCreatePost = (props) => {
    return (
        <div className={classes.Container}>
            <div className={classes.Dump} />
            <div className={classes.Navigation}>
                loadImage
                <Button>Tweet</Button>
            </div>
        </div>
    );
}

export default navigationCreatePost;