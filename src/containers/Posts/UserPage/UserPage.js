import React, {Component} from "react";
import classes from './UserPage.module.css'
import {connect} from 'react-redux';
import {fetchMoreUserPosts} from '../../../store/actions/posts';
import UserDetail from "../../../components/UserDetail/UserDetail";
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Post from "../Post/Post";
import SharedPost from "../Post/SharedPost";
import * as usersActions from '../../../store/actions/users';


class UserPage extends Component{
    componentDidMount() {
        this.props.clearUser();
        const username = this.props.match.params.username;
        this.props.loadUser(username);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.match.params.username !== this.props.match.params.username){
            this.props.clearUser();
            const username = this.props.match.params.username;
            this.props.loadUser(username);
        }
    }

    loadMore = () => {
        this.props.fetchMore(this.props.linkLoadMore,
                        this.props.pickedUser.uuid);
    }

    followHandle = () => {
        if (this.props.pickedUser.followed_by_current_user) {
            this.props.unfollowUser(this.props.pickedUser.uuid);
        }
        else{
            this.props.followUser(this.props.pickedUser.uuid);
        }
    }

    render() {
        let userDetail = <UserDetail loading={true} />;
        if(this.props.pickedUser){
            userDetail = (
                        <UserDetail
                            user={this.props.pickedUser}
                            performFolllowAction={this.followHandle.bind(this)}
                        />
            );
        }
        return(
            <div className={classes.UserPage}>
                {userDetail}
                {this.props.pickedUser ? (<InfiniteScroll
                    next={() => {
                        if(this.props.linkLoadMore) {
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
                        </h2>)
                    }
                >
                    {this.props.posts.map(
                        singlePost => {
                            if(singlePost.user && this.props.pickedUser) {
                                if (`${singlePost.user}`.substring(36, singlePost.user.length - 1)
                                    === this.props.pickedUser.uuid) {
                                    return (<Post key={`${singlePost.id}${singlePost.user}`}
                                                  post={singlePost}
                                                  user={this.props.pickedUser}/>);
                                }
                                else {
                                    if (this.props.users[`${singlePost.user}`.substring(36,
                                        singlePost.user.length - 1)]) {
                                        return (<SharedPost key={`${singlePost.id}${singlePost.user}`}
                                                            post={singlePost}
                                                            user={this.props.users[`${singlePost.user}`
                                                                .substring(36, singlePost.user.length - 1)]}
                                                            userWhoShared={this.props.pickedUser}/>);
                                    }
                                    else {
                                        return (<SharedPost
                                            key={`${singlePost.id}${singlePost.user}`}
                                            post={singlePost}
                                            loading={true}/>);
                                    }
                                }
                            }
                        }
                    )}
                </InfiniteScroll>) : <Spinner />}
            </div>
        );
    }
}


const mapStateToProps = state => ({
    currentUser: state.auth.user,
    pickedUser: state.users.pickedUser,
    posts: state.posts.posts,
    linkLoadMore: state.posts.linkToLoadMoreUserPage,
    users: state.users.users,
    hasMore: state.posts.hasMore
});

const mapDispatchToProps = dispatch => ({
    loadUser: (username) => dispatch(usersActions.fetchUser(username, true)),
    fetchMore: (link, userUuid) => dispatch(fetchMoreUserPosts(link, userUuid)),
    clearUser: () => dispatch(usersActions.clearPickedUser()),

    followUser: (pickedUserUuid) => dispatch(usersActions.followUser(pickedUserUuid)),
    unfollowUser: (pickedUserUuid) => dispatch(usersActions.unfollowUser(pickedUserUuid))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);