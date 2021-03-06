import React from "react";
import classes from './NewsFeed.module.css';
import Post from "../Post/Post";
import CreatePost from "../CreatePost/CreatePost";
import {connect} from 'react-redux';
import * as newsFeedActions from '../../../store/actions/newsFeed';
import Spinner from '../../../components/UI/Spinner/Spinner';
import SharedPost from '../Post/SharedPost';
import InfiniteScroll from 'react-infinite-scroll-component';


class NewsFeed extends React.Component{
    componentDidMount() {
        this.props.loadNewsFeed();
    }

    loadMore = () => {
        this.props.loadMoreNewsFeed(this.props.newsFeedTimeStamp);
    }

    render() {
        return(
            <div className={classes.NewsFeed}>
                <div className={classes.ContainerTitle}>
                    <div className={classes.Title}>
                        <h2>Home</h2>
                    </div>
                </div>
                <div className={classes.EmptySpace}/>
                <CreatePost />

                <InfiniteScroll
                    next={() => {
                        if(this.props.newsFeedTimeStamp)
                        {
                            this.loadMore();
                        }
                    }}
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
                    {this.props.posts.map(
                        singlePost => {
                            if (!singlePost.tweet_itself) {
                                if (this.props.users[`${singlePost.user}`.substring(36, singlePost.user.length - 1)]) {
                                    return (<Post key={`${singlePost.id}${singlePost.user}`}
                                                  post={singlePost}
                                                  user={this.props.users[`${singlePost.user}`.substring(36,
                                                      singlePost.user.length - 1)]}/>);
                                }
                                else {
                                    return (<Post key={`${singlePost.id}${singlePost.user}`}
                                                 post={singlePost}
                                                 loading={true}/>);
                                }
                            }
                            else {
                                if (this.props.users[`${singlePost.account}`.substring(36, singlePost.account.length - 1)] &&
                                    this.props.users[`${singlePost.tweet_itself.user}`.substring(36,
                                            singlePost.tweet_itself.user.length - 1)]) {
                                    return (<SharedPost key={`${singlePost.tweet_itself.id}${singlePost.account}`}
                                                        post={singlePost.tweet_itself}
                                                        userWhoShared={this.props.users[`${singlePost.account}`.substring(
                                                                36, singlePost.account.length - 1)]}
                                                        user={this.props.users[`${singlePost.tweet_itself.user}`.substring(
                                                                36, singlePost.tweet_itself.user.length - 1)]}/>);
                                }
                                else {
                                    return (<SharedPost
                                        key={`${singlePost.tweet_itself.id}${singlePost.account}`}
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
    newsFeedTimeStamp: state.posts.newsFeedTimeStamp,
    posts: state.posts.posts,
    users: state.users.users,
    hasMore: state.posts.hasMore
});

const mapDispatchToProps = dispatch => ({
    loadNewsFeed: () => dispatch(newsFeedActions.fetchNewsFeed()),
    loadMoreNewsFeed: (timeStamp) =>
        dispatch(newsFeedActions.fetchMore(timeStamp))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);