import React from "react";
import classes from './NewsFeed.module.css';
import Post from "../../../components/Post/Post";
import CreatePost from "../CreatePost/CreatePost";
import {connect} from 'react-redux';
import * as newsFeedActions from '../../../store/actions/newsFeed';
import Spinner from '../../../components/UI/Spinner/Spinner';
import SharedPost from '../../../components/Post/SharedPost';
import InfiniteScroll from 'react-infinite-scroll-component';


class NewsFeed extends React.Component{
    componentDidMount() {
        this.props.fetchNewsFeed();
    }

    loadMore = () => {
        this.props.fetchMore(this.props.newsFeedTimeStamp);
    }

    render() {
        // let content = null;
        //
        // if(!this.props.loadingPosts){
        //     const mergedPosts = this.mergePostsWithShares()
        //     if(mergedPosts.length === 0 && this.props.available){
        //         content = (<h2
        //             style={{
        //                 textAlign: 'center',
        //                 margin: '2em 0'
        //             }}>
        //             No tweets to show.
        //             <br/><br/>
        //             <small>
        //                 Start following people.
        //             </small>
        //         </h2>);
        //     }
        //     else {
        //         content = mergedPosts.map(
        //             singlePost => {
        //                 if (!singlePost.tweet_itself) {
        //                     if (this.props.users[`${singlePost.user}`.substring(36, singlePost.user.length - 1)]) {
        //                         return (<Post key={singlePost.id}
        //                                       post={singlePost}
        //                                       user={this.props.users[`${singlePost.user}`.substring(36, singlePost.user.length - 1)]}/>);
        //                     } else {
        //                         return <Post key={singlePost.id}
        //                                      post={singlePost}
        //                                      loading={true}/>
        //                     }
        //                 } else {
        //                     if (this.props.users[`${singlePost.account}`.substring(36, singlePost.account.length - 1)] &&
        //                         this.props.users[`${singlePost.tweet_itself.user}`.substring(36, singlePost.tweet_itself.user.length - 1)]) {
        //                         return (<SharedPost key={singlePost.id}
        //                                             post={singlePost.tweet_itself}
        //                                             account={this.props.users[`${singlePost.account}`.substring(36, singlePost.account.length - 1)]}
        //                                             user={this.props.users[`${singlePost.tweet_itself.user}`.substring(36, singlePost.tweet_itself.user.length - 1)]}/>);
        //                     } else {
        //                         return (<SharedPost
        //                             key={singlePost.id}
        //                             post={singlePost.tweet_itself}
        //                             loading={true}/>);
        //                     }
        //                 }
        //             }
        //         );
        //     }
        // }
        return(
            <div className={classes.NewsFeed}>
                <h2>Home</h2>
                <CreatePost />
                <InfiniteScroll
                    next={() => {this.loadMore()}}
                    hasMore={this.props.hasMore}
                    loader={<Spinner />}
                    dataLength={this.props.posts.length}
                    endMessage={ this.props.posts.length > 0 ?
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
                            <br/><br/>
                            <small>
                                Start following people.
                            </small>
                        </h2>)
                    }
                >
                    { this.props.posts.map(
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
                    )}
                </InfiniteScroll>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    newsFeedTimeStamp: state.newsFeed.newsFeedTimeStamp,
    posts: state.newsFeed.posts,
    users: state.users.users,
    hasMore: state.newsFeed.hasMore
});

const mapDispatchToProps = dispatch => ({
    fetchNewsFeed: () => dispatch(newsFeedActions.fetchNewsFeed()),
    fetchMore: (timeStamp) =>
        dispatch(newsFeedActions.fetchMore(timeStamp))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);