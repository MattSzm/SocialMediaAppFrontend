import React from "react";
import classes from './NavigationsCreatePost.module.css';
import Button from "../UI/StandardButton/StandardButton";
import UploadImages from "./UploadImages/UploadImages";

const navigationCreatePost = (props) => {
    return (
        <div className={classes.Container}>
            <div className={classes.Dump} />
            <div className={classes.Navigation}>
                <UploadImages
                    images={props.images}
                    upload={props.pictureUpload}
                    registration={false}
                    tranparentButtons={false}
                />
                <Button
                    click={props.sumbit}>
                    {props.comment ? 'Comment' : 'Tweet'}
                </Button>
            </div>
            <div className={classes.Dump2} />
        </div>
    );
}

export default navigationCreatePost;