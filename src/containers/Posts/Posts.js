import React from "react";
import classes from './Posts.module.css';
import Post from "../../components/Post/Post";
import CreatePost from "./CreatePost/CreatePost";
import {connect} from 'react-redux';
import * as newsFeedActions from '../../store/actions/newsFeed';
import Spinner from '../../components/UI/Spinner/Spinner';


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
            content = this.mergePostsWithShares().map(
                singlePost => {
                    if(singlePost.tweet_itself){
                        singlePost = singlePost.tweet_itself;
                    }
                    if(this.props.users[`${singlePost.user}`.substring(36, singlePost.user.length-1)]){
                    return (<Post key={singlePost.id}
                                  post={singlePost}
                                  user={this.props.users[`${singlePost.user}`.substring(36, singlePost.user.length-1)]}/>);}
                }
            );
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
    loadingPosts: state.posts.loading
});

const mapDispatchToProps = dispatch => ({
   fetchNewsFeed: () => dispatch(newsFeedActions.fetchNewsFeed())
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);