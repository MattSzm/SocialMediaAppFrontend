import React from "react";
import classes from './Post.module.css';
import photo from '../../assets/mockAvatar1.jpeg'
import PostContent from "./PostContent/PostContent";


const Post = (props) => {
    return (
        <div className={classes.Post}>
            <div className={classes.PostImage}>
                <img src={photo}/>
            </div>

            <PostContent/>

        </div>
    );
}

export default Post;