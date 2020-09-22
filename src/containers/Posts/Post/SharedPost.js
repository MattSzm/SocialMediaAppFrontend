import React from "react";
import Post from './Post';
import classes from './SharedPost.module.css';
import shareIcon from '../../../assets/icons/share.png';
import {Link} from "react-router-dom";


const sharedPost = (props) => {
    return (
        <div className={classes.SharedPost}>
            {props.loading ? <span className={classes.ShareLoading}>.</span> :
                <span className={classes.Share}>
                    <img src={shareIcon} />
                    <Link to={`/user/${props.userWhoShared.username}`}
                          style={{ textDecoration: 'none',
                              color: 'inherit'}}>
                    {props.userWhoShared.username_displayed} </Link>
                    Retweeted
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