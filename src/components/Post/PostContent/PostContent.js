import React from "react";
import classes from './PostContent.module.css';


const PostContent = (props) => {
    return (
        <div className={classes.PostContent}>
            <p className={classes.bolded}>Author nickname</p>
        </div>
    );
}

export default PostContent;