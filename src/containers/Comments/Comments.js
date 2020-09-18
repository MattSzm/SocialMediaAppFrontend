import React, {Component} from "react";
import newsFeedClasses from '../../containers/Posts/NewsFeed/NewsFeed.module.css';
import classes from './Comments.module.css';
import {connect} from "react-redux";
import * as commentsActions from '../../store/actions/comments';
import Spinner from "../../components/UI/Spinner/Spinner";
import Post from "../Posts/Post/Post";


class Comments extends Component{
    componentDidMount() {
        this.props.clearComments();
        const postUuid = this.props.match.params.postUuid;
        this.props.loadPostWithComments(postUuid);
    }

    render() {
        let post = <Spinner />;
        if(this.props.pickedPost){
            post = <Post
                        post={this.props.pickedPost}
                        loading={true}
                        detail={true} />;
            if(this.props.userOfPickedPost){
                post = <Post
                            post={this.props.pickedPost}
                            user={this.props.userOfPickedPost}
                            detail={true}/>;
            }
        }

        return (
            <div className={newsFeedClasses.NewsFeed}>
                <div className={newsFeedClasses.ContainerTitle}>
                    <div className={newsFeedClasses.Title}>
                        <h2>Comments</h2>
                    </div>
                </div>
                <div className={newsFeedClasses.EmptySpace}/>
                {post}

            </div>
        );
    }
}


const mapStateToProps = state => ({
    pickedPost: state.comments.pickedPost,
    userOfPickedPost: state.comments.userOfPickedPost,
    comments: state.comments.comments,
    currentUser: state.auth.user
});

const mapDispatchToProps = dispatch => ({
    clearComments: () => dispatch(commentsActions.clearCommentsReducer()),
    loadPostWithComments: (postUuid) => dispatch(
        commentsActions.fetchTweetWithComments(postUuid))
});


export default connect(mapStateToProps, mapDispatchToProps)(Comments);
