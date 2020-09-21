import React, {Component} from "react";
import NewsFeedClasses from "../Posts/NewsFeed/NewsFeed.module.css";
import {connect} from 'react-redux';
import {fetchPostsWithHashtag, fetchMorePostsWithHashtag} from '../../store/actions/posts';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../../components/UI/Spinner/Spinner";
import Post from "../Posts/Post/Post";


class HashtagPage extends Component{
    componentDidMount() {
        const hashtagValue = this.props.match.params.hashtagValue;
        this.props.loadPostsWithHashtag(hashtagValue);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.match.params.hashtagValue !== this.props.match.params.hashtagValue){
            const hashtagValue = this.props.match.params.hashtagValue;
            this.props.loadPostsWithHashtag(hashtagValue);
        }
    }

    loadMore = () => {
        this.props.loadMorePostsWithHashtag(
            this.props.linkLoadMore);
    }

    render() {
        return (
            <div className={NewsFeedClasses.NewsFeed}>
                <div className={NewsFeedClasses.ContainerTitle}>
                    <div className={NewsFeedClasses.Title}>
                        <h2>#{this.props.match.params.hashtagValue}</h2>
                    </div>
                </div>
                <div style={{
                    width: '100%',
                    height: '3em'
                }}/>
                <InfiniteScroll next={()=>{
                                    if(this.props.linkLoadMore){
                                        this.loadMore()
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
                                    </h2>)
                                }
                            >
                    {this.props.posts.map(
                        singlePost => {
                            if(singlePost.user) {
                                if (this.props.users[`${singlePost.user}`.substring(36, singlePost.user.length - 1)]) {
                                    return (<Post key={singlePost.id}
                                                  post={singlePost}
                                                  user={this.props.users[`${singlePost.user}`.substring(36,
                                                      singlePost.user.length - 1)]}/>);
                                } else {
                                    return (<Post key={singlePost.id}
                                                  post={singlePost}
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
    posts: state.posts.posts,
    linkLoadMore: state.posts.linkToLoadMoreUserPage,
    users: state.users.users,
    hasMore: state.posts.hasMore
});

const mapDispatchToProps = dispatch => ({
    loadPostsWithHashtag: (hashtagValue) => dispatch(
        fetchPostsWithHashtag(hashtagValue)),
    loadMorePostsWithHashtag: (link) => dispatch(
        fetchMorePostsWithHashtag(link))
});

export default connect(mapStateToProps, mapDispatchToProps)(HashtagPage);