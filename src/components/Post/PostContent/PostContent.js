import React from "react";
import classes from './PostContent.module.css';
import likeButton from '../../../assets/icons/like.png'
import commentButton from '../../../assets/icons/comment.png'
import shareButton from '../../../assets/icons/share.png';


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
    return (
        <div className={classes.PostContent}>
            <p className={classes.bolded}>Author nickname <span>&#183; Aug 17</span></p>
            <p>{hashtag_formatter("Goooooodmorning @guyssss! #working in @the studio on new music, what are you doing #today??")}</p>

            <div className={classes.Icons}>
                <img src={likeButton} />
                <img src={commentButton} />
                <img src={shareButton} />
            </div>
        </div>
    );
}

export default PostContent;