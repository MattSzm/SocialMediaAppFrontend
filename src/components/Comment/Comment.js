import React from "react";
import PostClasses from '../../containers/Posts/Post/Post.module.css';
import Avatar from "../Images/Avatar/Avatar";
import CommentContent from "./CommentContent/CommentContent";
import CloseButton from "../UI/CloseButton/CloseButton";


const comment = (props) => {
    let content = (
        <div className={PostClasses.Post}>
            <Avatar
                blank={false}
                loading={true} />
            <CommentContent
                loading={true}
                date={props.comment.created}
                content={props.comment.comment_content}
            />
        </div>
    );
    if(!props.loading){
        let avatar = (<Avatar blank={true} />);
        if(props.user.photo){
            avatar = ( <Avatar link={props.user.photo} />);
        }
        content = (
            <div className={PostClasses.Post}>
                {avatar}
                <CommentContent
                    username={props.user.username}
                    usernameDisplay={props.user.username_displayed}
                    date={props.comment.created}
                    content={props.comment.comment_content}
                    imageLink={props.comment.image}
                />
                {(props.currentUser &&
                    (props.currentUser.uuid === props.user.uuid)) ?
                    <CloseButton
                        clicked={props.deleteAction}
                        post={true} /> : null}

            </div>
        );
    }

    return (
        <React.Fragment>
            {content}
        </React.Fragment>
    );
}

export default comment;