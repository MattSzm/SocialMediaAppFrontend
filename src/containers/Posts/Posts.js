import React from "react";
import classes from './Posts.module.css';
import Post from "../../components/Post/Post";
import CreatePost from "./CreatePost/CreatePost";
import {connect} from 'react-redux';
import * as newsFeedActions from '../../store/actions/newsFeed';
import Spinner from '../../components/UI/Spinner/Spinner';
import SharedPost from '../../components/Post/SharedPost';

class Posts extends React.Component{
    componentDidMount() {
        this.props.fetchNewsFeed();
    }

    mergePostsWithShares = () => {
        let postIndex = 0;
        let shareIndex = 0;
        let output = []
        while (postIndex < this.props.posts.length &&
                shareIndex < this.props.shares.length){
            if(this.props.posts[postIndex].created > this.props.shares[shareIndex].created){
                output.push(this.props.posts[postIndex]);
                postIndex++;
            } else{
              output.push(this.props.shares[shareIndex]);
              shareIndex++;
            }
        }
        while (postIndex < this.props.posts.length){
            output.push(this.props.posts[postIndex]);
            postIndex++;
        }
        while (shareIndex < this.props.shares.length){
            output.push(this.props.shares[shareIndex]);
            shareIndex++;
        }
        return output;
    }

    render() {
        let content = <Spinner />
        if(!this.props.loadingPosts){
            const mergedPosts = this.mergePostsWithShares()
            if(mergedPosts.length === 0 && this.props.available){
                content = (<h2
                    style={{
                        textAlign: 'center',
                        margin: '2em 0'
                    }}>
                    No tweets to show.
                    <br/><br/>
                    <small>
                        Start following people.
                    </small>
                </h2>);
            }
            else {
                content = mergedPosts.map(
                    singlePost => {
                        if (!singlePost.tweet_itself) {
                            if (this.props.users[`${singlePost.user}`.substring(36, singlePost.user.length - 1)]) {
                                return (<Post key={singlePost.id}
                                              post={singlePost}
                                              user={this.props.users[`${singlePost.user}`.substring(36, singlePost.user.length - 1)]}/>);
                            } else {
                                return <Post key={singlePost.id}
                                             post={singlePost}
                                             loading={true}/>
                            }
                        } else {
                            if (this.props.users[`${singlePost.account}`.substring(36, singlePost.account.length - 1)] &&
                                this.props.users[`${singlePost.tweet_itself.user}`.substring(36, singlePost.tweet_itself.user.length - 1)]) {
                                return (<SharedPost key={singlePost.id}
                                                    post={singlePost.tweet_itself}
                                                    account={this.props.users[`${singlePost.account}`.substring(36, singlePost.account.length - 1)]}
                                                    user={this.props.users[`${singlePost.tweet_itself.user}`.substring(36, singlePost.tweet_itself.user.length - 1)]}/>);
                            } else {
                                return (<SharedPost
                                    key={singlePost.id}
                                    post={singlePost.tweet_itself}
                                    loading={true}/>);
                            }
                        }
                    }
                );
            }
        }

        return(
            <div className={classes.Posts}>
                {/*NewsFeed*/}
                <h2>Home</h2>
                <CreatePost />

                {content}


            </div>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts,
    shares: state.posts.shares,
    users: state.users.users,
    loadingPosts: state.posts.loading,
    available: (state.posts.newsFeedPostsTimeStamp !== null
        && state.posts.newsFeedSharesTimeStamp !== null)
});

const mapDispatchToProps = dispatch => ({
   fetchNewsFeed: () => dispatch(newsFeedActions.fetchNewsFeed())
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);