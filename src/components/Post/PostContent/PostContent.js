import React from "react";
import classes from './PostContent.module.css';

const hashtag_formatter = string => {
    return string.split(/((?:^|\s)(?:[@|#][a-z\d-]+))/gi).filter(Boolean).map((v, i) => {
        if(v.includes('#') || v.includes('@')){
            return <span key={i} style={{color: '#1DA1F2'}}>{v}</span>
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
        </div>
    );
}

export default PostContent;