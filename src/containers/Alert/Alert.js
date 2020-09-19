import React, {Component, Fragment} from "react";
import {withAlert} from "react-alert";
import {connect} from 'react-redux';


class Alert extends Component{
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { error, alert, message } = this.props;
        if(error !== prevProps.error){
            if(error.message.username){
                alert.error('Username or e-mail is required');
            }
            if(error.message.password){
                alert.error('Password is required');
            }
            if(error.message.email){
                alert.error(error.message.email);
            }
            if(error.message.non_field_errors){
                alert.error(error.message.non_field_errors);
            }
            if(error.message.newsfeed){
                alert.error(error.message.newsfeed);
            }
            if(error.message.createPost){
                alert.error(error.message.createPost);
            }
            if(error.message.createCommentFail){
                alert.error(error.message.createCommentFail);
            }
            if(error.message.userFail){
                alert.error(error.message.userFail);
            }
            if(error.message.userEdit){
                alert.error(error.message.userEdit);
            }
            if(error.message.fetchFollowing){
                alert.error(error.message.fetchFollowing);
            }
            if(error.message.userPosts){
                alert.error(error.message.userPosts);
            }
            if(error.message.postComments){
                alert.error(error.message.postComments);
            }
            if(error.message.sharePost406){
                alert.error(error.message.sharePost406);
            }
            if(error.message.sharePost409){
                alert.error(error.message.sharePost409);
            }
            if(error.message.noUser){
                alert.error(error.message.noUser);
            }
            if(error.message.noTweet){
                alert.error(error.message.noTweet);
            }
            if(error.message.badCreditsRegistration){
                alert.error(error.message.badCreditsRegistration);
            }
            if(error.message.badCreditsEditProfile){
                alert.error(error.message.badCreditsEditProfile);
            }
            if(error.status === 500){
                alert.error('Error');
            }
        }
        if(message !== prevProps.message){
            if(message.loggedIn){
                alert.success(message.loggedIn);
            }
            if(message.createdComment){
                alert.success(message.createdComment);
            }
            if(message.loggedOut){
                alert.success(message.loggedOut);
            }
            if(message.registered){
                alert.success(message.registered);
            }
            if(message.profileUpdated){
                alert.success(message.profileUpdated);
            }
            if(message.createdPost){
                alert.success(message.createdPost);
            }
            if(message.postDeleted){
                alert.success(message.postDeleted);
            }
            if(message.commentDeleted){
                alert.success(message.commentDeleted);
            }
        }
    }

    render() {
        return (
            <Fragment />
        );
    }
}
const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alert));