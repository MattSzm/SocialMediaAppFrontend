import React from "react";
import Post from './Post';
import classes from './SharedPost.module.css';
import shareIcon from '../../assets/icons/share.png';


const sharedPost = (props) => {
    return (
        <div className={classes.SharedPost}>
            {props.loading ? <span className={classes.ShareLoading}>.</span> :
                <span className={classes.Share}>
                    <img src={shareIcon} />
                    {props.userWhoShared.username_displayed} Retweeted
                </span>}
            <Post
                post={props.post}
                notReady={props.notReady}
                user={props.user}
                loading={props.loading}/>
        </div>
    );
}

export default React.memo(sharedPost);