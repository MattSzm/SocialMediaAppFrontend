import React from "react";
import classes from './NavigationsCreatePost.module.css';
import Button from "../UI/StandardButton/StandardButton";
import UploadFile from "./UploadFile/UploadFile";

const navigationCreatePost = (props) => {
    return (
        <div className={classes.Container}>
            <div className={classes.Dump} />
            <div className={classes.Navigation}>
                <UploadFile upload={props.pictureUpload}/>
                <Button>Tweet</Button>
            </div>
        </div>
    );
}

export default navigationCreatePost;