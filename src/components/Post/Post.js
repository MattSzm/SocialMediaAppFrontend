import React from "react";
import classes from './Post.module.css';
import PostContent from "./PostContent/PostContent";
import Avatar from '../images/Avatar/Avatar';


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
        let avatar = (<Avatar blank={true}/>);
        if(props.user.photo){
            avatar = ( <Avatar link={props.user.photo}/>);
        }
        content = (
            <div className={classes.Post}>
                {avatar}
                <PostContent
                    username={props.user.username}
                    usernameDisplay={props.user.username_displayed}
                    date={props.post.created}
                    content={props.post.content}
                    likedAlready={props.post.liked_by_current_user}
                    imageLink={props.post.image}
                    likesNumber={props.post.number_likes}
                    commentsNumber={props.post.number_comments}
                    sharesNumber={props.post.number_shares}
                />
            </div>
        );

    }
    return (
        <React.Fragment>
            {content}
        </React.Fragment>
    );
}

export default React.memo(post);