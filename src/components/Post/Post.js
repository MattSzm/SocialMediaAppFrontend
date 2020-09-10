import React from "react";
import classes from './Post.module.css';
import PostContent from "./PostContent/PostContent";
import Avatar from '../Avatar/Avatar';

const post = (props) => {
    return (
        <div className={classes.Post}>
            <Avatar link={props.user.photo} />
            <PostContent
                username={props.user.username}
                usernameDisplay={props.user.username_displayed}
                date={props.post.created}
                content={props.post.content}
            />
        </div>
    );
}

export default post;