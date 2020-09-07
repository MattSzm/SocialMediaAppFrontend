import React from "react";
import classes from './Post.module.css';
import photo from '../../assets/mockAvatar1.jpeg'
import PostContent from "./PostContent/PostContent";
import Avatar from '../Avatar/Avatar';

const post = (props) => {
    return (
        <div className={classes.Post}>
            <Avatar link={photo} />
            <PostContent/>
        </div>
    );
}

export default post;