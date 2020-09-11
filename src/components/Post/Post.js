import React from "react";
import classes from './Post.module.css';
import PostContent from "./PostContent/PostContent";
import Avatar from '../Avatar/Avatar';

const post = (props) => {
    let content = (
        <div className={classes.Post}>
            <Avatar
                blank={false}
                loading={true} />
            <PostContent
                loading={true}
                date={props.post.created}
                content={props.post.content}
            />
        </div>
    );
    if(!props.loading){
        if(props.user.photo) {
            content = (
                <div className={classes.Post}>
                    <Avatar link={props.user.photo}/>
                    <PostContent
                        username={props.user.username}
                        usernameDisplay={props.user.username_displayed}
                        date={props.post.created}
                        content={props.post.content}
                        likedAlready={props.post.liked_by_current_user}
                    />
                </div>
            );
        }
        else{
            content = (
                <div className={classes.Post}>
                    <Avatar blank={true}/>
                    <PostContent
                        username={props.user.username}
                        usernameDisplay={props.user.username_displayed}
                        date={props.post.created}
                        content={props.post.content}
                        likedAlready={props.post.liked_by_current_user}
                    />
                </div>
            );
        }
    }

    return (
        <React.Fragment>
            {content}
        </React.Fragment>
    );
}

export default React.memo(post);