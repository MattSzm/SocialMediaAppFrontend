import React, {Component} from "react";
import classes from './Post.module.css';
import PostContent from "../../../components/PostContent/PostContent";
import Avatar from '../../../components/Images/Avatar/Avatar';
import {connect} from 'react-redux';
import CloseButton from "../../../components/UI/CloseButton/CloseButton";
import * as postActions from '../../../store/actions/posts';


class Post extends Component{
    deletePostHandler = (postUuid) => {
        this.props.deletePost(postUuid);
    }

    likePost = (postUuid, likedAlready) => {
        if(this.props.detail){
            if(!likedAlready){
                this.props.createLikePost(postUuid, true);
            }
            else{
                this.props.deleteLikePost(postUuid, true);
            }
        }
        else {
            if (!likedAlready) {
                this.props.createLikePost(postUuid, false);
            } else {
                this.props.deleteLikePost(postUuid, false);
            }
        }
    }

    sharePost = (postUuid, sharedAlready) => {
        if(this.props.detail){
            if(!sharedAlready){
                this.props.createSharePost(postUuid, true);
            }
            else{
                this.props.deleteSharePost(postUuid, true);
            }
        }
        else {
            if (!sharedAlready) {
                this.props.createSharePost(postUuid, false);
            } else {
                this.props.deleteSharePost(postUuid, false);
            }
        }
    }

    render() {
        let content = (
            <div className={classes.Post}>
                <Avatar
                    blank={false}
                    loading={true} />
                <PostContent
                    loading={true}
                    date={this.props.post.created}
                    content={this.props.post.content}
                />
            </div>
        );
        if(!this.props.loading){
            let avatar = (<Avatar blank={true}/>);
            if(this.props.user.photo){
                avatar = ( <Avatar link={this.props.user.photo}/>);
            }
            content = (
                <div className={classes.Post}>
                    {avatar}
                    <PostContent
                        username={this.props.user.username}
                        usernameDisplay={this.props.user.username_displayed}
                        date={this.props.post.created}
                        content={this.props.post.content}
                        commentUuid={this.props.post.uuid}
                        imageLink={this.props.post.image}
                        likesNumber={this.props.post.number_likes}
                        commentsNumber={this.props.post.number_comments}
                        sharesNumber={this.props.post.number_shares}
                        likedAlready={this.props.post.liked_by_current_user}
                        sharedAlready={this.props.post.shared_by_current_user}
                        commentedAlready={this.props.post.commented_by_current_user}

                        LikeOnClick={this.likePost.bind(this,
                                    this.props.post.uuid,
                                    this.props.post.liked_by_current_user)}
                        ShareOnClick={this.sharePost.bind(this,
                                    this.props.post.uuid,
                                    this.props.post.shared_by_current_user)}
                    />
                    {(this.props.currentUser &&
                        (this.props.currentUser.uuid === this.props.user.uuid)) ?
                            <CloseButton
                                clicked={this.deletePostHandler.bind(this, this.props.post.uuid)}
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
}

const mapStateToProps = state => ({
   currentUser: state.auth.user
});

const mapDispatchToProps = dispatch => ({
    deletePost: (postUuid) => dispatch(postActions.deletePost(postUuid)),

    createLikePost: (postUuid, idDetail) => dispatch(postActions.createLikePost(postUuid, idDetail)),
    deleteLikePost: (postUuid, idDetail) => dispatch(postActions.deleteLikePost(postUuid, idDetail)),

    createSharePost: (postUuid, idDetail) => dispatch(postActions.createSharePost(postUuid, idDetail)),
    deleteSharePost: (postUuid, idDetail) => dispatch(postActions.deleteSharePost(postUuid, idDetail))
});


export default connect(mapStateToProps, mapDispatchToProps)(Post);