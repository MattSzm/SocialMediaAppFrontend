import React, {Component} from "react";
import newsFeedClasses from '../../containers/Posts/NewsFeed/NewsFeed.module.css';
import classes from './Comments.module.css';
import {connect} from "react-redux";
import * as commentsActions from '../../store/actions/comments';
import Spinner from "../../components/UI/Spinner/Spinner";
import Post from "../Posts/Post/Post";
import CreateComment from "./CreateComment/CreateComment";
import InfiniteScroll from "react-infinite-scroll-component";


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
                <div className={classes.EmptySpace}/>
                {post}
                <CreateComment
                    postUuid={this.props.pickedPost ?
                                this.props.pickedPost.uuid : null}/>
                <InfiniteScroll next={ () => {}}
                                hasMore={this.props.hasMore}
                                loader={<Spinner />}
                                dataLength={this.props.comments.length}
                                endMessage={ this.props.comments.length > 0 ?
                                    (<p style={{textAlign: 'center',
                                        marginBottom: '4em',
                                        color: '#AAB8C2'}}>
                                        You have seen it all!
                                    </p>) :
                                    (<h2
                                        style={{
                                            textAlign: 'center',
                                            margin: '2em 0'
                                        }}>
                                        No tweets to show.
                                    </h2>)}
                                >
                    {this.props.comments.map(
                        singleComment => {
                            return <h2 key={singleComment.id}>{singleComment.comment_content}</h2>
                        }
                    )}
                </InfiniteScroll>


            </div>
        );
    }
}


const mapStateToProps = state => ({
    pickedPost: state.comments.pickedPost,
    userOfPickedPost: state.comments.userOfPickedPost,
    comments: state.comments.comments,
    linkLoadMore: state.comments.linkToLoadMoreComments,
    users: state.users.users,
    hasMore: state.comments.hasMore
});

const mapDispatchToProps = dispatch => ({
    clearComments: () => dispatch(commentsActions.clearCommentsReducer()),
    loadPostWithComments: (postUuid) => dispatch(
        commentsActions.fetchTweetWithComments(postUuid)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Comments);
