import React from "react";
import classes from './PostContent.module.css';
import likeButton from '../../../assets/icons/heart.png'
import commentButton from '../../../assets/icons/comment.png'
import shareButton from '../../../assets/icons/share.png';
import Linkify from 'react-linkify'
import PostImage from "../../images/PostImage/PostImage";


const hashtag_formatter = string => {
    return string.split(/((?:^|\s)(?:[@|#][a-z\d-]+))/gi)
        .filter(Boolean).map((v, i) => {
        if(v.includes('#') || v.includes('@')){
            return <span key={i} className={classes.hashtag}>{v}</span>
        }
        else{
            return <span key={i} >{v}</span>
        }
    })
};


const PostContent = (props) => {
    let date = props.date.substring(0,10) + ' ' +
        props.date.substring(11,16);
    return (
        <div className={classes.PostContent}>
            {props.loading ? (<p className={classes.bolded}>
                <span
                    className={classes.loading}
                    style={{color: '#E1E8ED'}}>
                    ...........
                </span>
                <span> @<span
                    className={classes.loading}
                    style={{color: '#E1E8ED'}}>
                    ...........
                </span>
                &#183; {date}</span></p>)
                :
                (<p className={classes.bolded}>
                    {props.usernameDisplay}<span style={{cursor: 'pointer'}}> @{props.username}
                    &#183; {date}</span>
                </p>)}
                <p>
                <Linkify fuzzyEmail={false}>
                    {hashtag_formatter(props.content)}
                </Linkify>
                </p>

            {props.imageLink ?
                (<PostImage link={props.imageLink} />) :
                null}

            <div className={classes.Icons}>
                <div className={classes.IconContainer}>
                    <img src={commentButton}
                         className={classes.Comment}/>
                     <small>{props.commentsNumber}</small>
                </div>

                <div className={classes.IconContainer}>
                    <img src={shareButton}
                        className={classes.Share}/>
                        <small>{props.sharesNumber}</small>
                </div>

                <div className={classes.IconContainer}>
                    {props.likedAlready ?
                        (<img src={likeButton}
                              className={classes.Like}
                                style={{
                                    backgroundColor: '#fddbdb',
                                    borderRadius: '35%'
                                }}/>)
                        :
                        (<img src={likeButton}
                              className={classes.Like}/>)
                    }
                    <small>{props.likesNumber}</small>
                </div>
            </div>
        </div>
    );
}

export default PostContent;