import React, {Component} from "react";
import classes from './Post.module.css';
import PostContent from "../../../components/PostContent/PostContent";
import Avatar from '../../../components/images/Avatar/Avatar';
import {connect} from 'react-redux';
import CloseButton from "../../../components/UI/CloseButton/CloseButton";
import * as postActions from '../../../store/actions/posts';


class Post extends Component{
    deletePost = (postUuid) => {
        this.props.deletePost(postUuid);
    }

    likePost = (postUuid, likedAlready) => {
        if(!likedAlready){
            this.props.createLikePost(postUuid);
        }
        else{
            this.props.deleteLikePost(postUuid)
        }
    }

    sharePost = (postUuid, sharedAlready) => {
        if(!sharedAlready){
            this.props.createSharePost(postUuid);
        }
        else{
            this.props.deleteSharePost(postUuid)
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
                        imageLink={this.props.post.image}
                        likesNumber={this.props.post.number_likes}
                        commentsNumber={this.props.post.number_comments}
                        sharesNumber={this.props.post.number_shares}
                        likedAlready={this.props.post.liked_by_current_user}
                        sharedAlready={this.props.post.shared_by_current_user}

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
                                clicked={this.deletePost.bind(this, this.props.post.uuid)}
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

    createLikePost: (postUuid) => dispatch(postActions.createLikePost(postUuid)),
    deleteLikePost: (postUuid) => dispatch(postActions.deleteLikePost(postUuid)),

    createSharePost: (postUuid) => dispatch(postActions.createSharePost(postUuid)),
    deleteSharePost: (postUuid) => dispatch(postActions.deleteSharePost(postUuid))
});


export default connect(mapStateToProps, mapDispatchToProps)(Post);