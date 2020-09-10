import React from "react";
import classes from './PostContent.module.css';
import likeButton from '../../../assets/icons/heart.png'
import commentButton from '../../../assets/icons/comment.png'
import shareButton from '../../../assets/icons/share.png';
import Linkify from 'react-linkify'


const hashtag_formatter = string => {
    return string.split(/((?:^|\s)(?:[@|#][a-z\d-]+))/gi).filter(Boolean).map((v, i) => {
        if(v.includes('#') || v.includes('@')){
            return <span key={i} className={classes.hashtag}>{v}</span>
        }
        else{
            return <span key={i} >{v}</span>
        }
    })
};


const PostContent = (props) => {
    let date = props.date.substring(0,10) + ' ' + props.date.substring(11,16);
    return (
        <div className={classes.PostContent}>
            <p className={classes.bolded}>{props.usernameDisplay}<span> @{props.username}
                            &#183; {date}</span></p>
            <p>
                <Linkify fuzzyEmail={false}>
                    {hashtag_formatter(props.content)}
                </Linkify>
            </p>

            <div className={classes.Icons}>
                <img src={commentButton} className={classes.Comment}/>
                <img src={shareButton} className={classes.Share}/>
                <img src={likeButton} className={classes.Like}/>
            </div>
        </div>
    );
}

export default PostContent;