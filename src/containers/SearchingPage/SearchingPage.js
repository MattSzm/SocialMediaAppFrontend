import React, {Component} from "react";
import NewsFeedClasses from "../Posts/NewsFeed/NewsFeed.module.css";
import FollowClasses from '../UserPage/Follow/Follow.module.css';
import {connect} from 'react-redux';
import {NavLink, withRouter} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../../components/UI/Spinner/Spinner";
import Post from "../Posts/Post/Post";
import {searchPostsWithPhrase, searchMorePostsWithPhrase} from '../../store/actions/posts';
import {searchUsersWithPhrase, searchMoreUsersWithPhrase} from '../../store/actions/users';
import UserItemFollow from "../../components/UserDetail/UserItemFollow/UserItemFollow";


class SearchingPage extends Component{
    componentDidMount(){
        const phraseValue = this.props.match.params.phrase;
        if(this.props.type === 'tweets'){
            this.props.searchPosts(phraseValue);
        }
        else if(this.props.type === 'users'){
            this.props.searchUsers(phraseValue);
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if((prevProps.match.params.phrase !== this.props.match.params.phrase) ||
                (prevProps.type !== this.props.type)){
            const phraseValue = this.props.match.params.phrase;
            if(this.props.type === 'tweets'){
                this.props.searchPosts(phraseValue);
            }
            else if(this.props.type === 'users'){
                this.props.searchUsers(phraseValue);
            }
        }
    }

    loadMorePosts = () => {
        this.props.searchMorePosts(
            this.props.linkLoadMorePosts);
    }

    loadMoreUsers = () => {
        this.props.searchMoreUsers(
            this.props.linkLoadMoreUsers);
    }

    render() {
        let header = this.props.match.params.phrase;
        if (header.length > 20){
            header = header.substring(0, 17) + '...';
        }
        if (header === ' '){
            header = 'Explore';
        }

        let content = null;
        if(this.props.type === 'tweets'){
            content = (
                <InfiniteScroll next={()=>{
                                    if(this.props.linkLoadMorePosts){
                                        this.loadMorePosts()
                                    }
                                }}
                                hasMore={this.props.hasMorePosts}
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
                                if (this.props.usersRelatedWithPosts[`${singlePost.user}`.substring(36, singlePost.user.length - 1)]) {
                                    return (<Post key={singlePost.id}
                                                  post={singlePost}
                                                  user={this.props.usersRelatedWithPosts[`${singlePost.user}`.substring(36,
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
            );
        }
        else if (this.props.type === 'users'){
            content = (
                <InfiniteScroll
                    next={ () => {
                        if(this.props.linkLoadMoreUsers){
                            this.loadMoreUsers();
                        }}
                    }
                    hasMore={this.props.hasMoreUsers}
                    loader={<Spinner />}
                    dataLength={this.props.users.length}
                    endMessage={ this.props.users.length > 0 ?
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
                            No users to show.
                        </h2>)
                    }
                >
                    {this.props.users.map(
                        singleUser => (<UserItemFollow
                            key={singleUser.id}
                            username={singleUser.username}
                            usernameDisplayed={singleUser.username_displayed}
                            image={singleUser.photo}/>)
                    )}
                </InfiniteScroll>
            );
        }
        return (
            <div className={NewsFeedClasses.NewsFeed}>
                <div className={NewsFeedClasses.ContainerTitle}>
                    <div className={NewsFeedClasses.Title}>
                        <h2>{header}</h2>
                    </div>
                </div>
                <div className={FollowClasses.Navigations}
                        style={{
                            marginTop: '2.5em'
                        }}>
                    <div className={FollowClasses.NavigationItem}>
                        <NavLink to={
                                `/explore/${this.props.match.params.phrase}/tweets`}
                                 exact
                                 className={FollowClasses.NavLink}
                                 activeClassName={FollowClasses.NavLinkActive}>
                            <h4>Tweets</h4>
                        </NavLink>
                    </div>
                    <div className={FollowClasses.NavigationItem}>
                        <NavLink to={
                                `/explore/${this.props.match.params.phrase}/users`} exact
                                 className={FollowClasses.NavLink}
                                 activeClassName={FollowClasses.NavLinkActive}>
                            <h4>Users</h4>
                        </NavLink>
                    </div>
                </div>
                {content}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts,
    linkLoadMorePosts: state.posts.linkToLoadMoreUserPage,
    hasMorePosts: state.posts.hasMore,
    usersRelatedWithPosts: state.users.users,

    users: state.users.usersAsList,
    linkLoadMoreUsers: state.users.linkToLoadMoreAsList,
    hasMoreUsers: state.users.hasMoreAsList,
});

const mapDispatchToProps = dispatch => ({
    searchPosts: (phrase) => dispatch(
            searchPostsWithPhrase(phrase)),
    searchMorePosts: (link) => dispatch(
            searchMorePostsWithPhrase(link)),

    searchUsers: (phrase) => dispatch(
            searchUsersWithPhrase(phrase)),
    searchMoreUsers: (link) => dispatch(
            searchMoreUsersWithPhrase(link))

});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchingPage));