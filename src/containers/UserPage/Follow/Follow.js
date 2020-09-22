import React,{Component} from "react";
import classes from './Follow.module.css';
import {connect} from 'react-redux';
import UserHeader from "../../../components/UserDetail/UserHeader/UserHeader";
import {NavLink, withRouter} from "react-router-dom";
import Spinner from "../../../components/UI/Spinner/Spinner";
import * as usersActions from '../../../store/actions/users';
import InfiniteScroll from "react-infinite-scroll-component";
import UserItemFollow from "../../../components/UserDetail/UserItemFollow/UserItemFollow";


class Follow extends Component{
    componentDidMount() {
        this.props.clearUser();
        const username = this.props.match.params.username;
        if(this.props.type === 'following') {
            this.props.loadUserWithFollowing(username);
        }
        else if(this.props.type === 'followers'){
            this.props.loadUserWithFollowers(username);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((prevProps.match.params.username !== this.props.match.params.username) ||
                (prevProps.type !== this.props.type)) {
            this.props.clearUser();
            const username = this.props.match.params.username;
            if(this.props.type === 'following') {
                this.props.loadUserWithFollowing(username);
            }
            else if(this.props.type === 'followers'){
                this.props.loadUserWithFollowers(username);
            }
        }
    }

    loadMore = () => {
        this.props.loadMoreFollow(this.props.linkToLoadMore);
    }

    render() {
        let userHeader = <UserHeader loading={true} />;
        if(this.props.pickedUser){
            userHeader = <UserHeader
                            loading={false}
                            usernameDisplayes={this.props.pickedUser.username_displayed}
                            NumberOfTweets={this.props.pickedUser.number_of_tweets}/>;
        }
        return (
            <div className={classes.Follow}>
                <div className={classes.Header}>
                    {userHeader}
                </div>
                <div className={classes.Navigations}>
                    <div className={classes.NavigationItem}>
                            <NavLink to={
                                `/user/${this.props.match.params.username}/following`} exact
                                className={classes.NavLink}
                                 activeClassName={classes.NavLinkActive}>
                                <h4>Following</h4>
                            </NavLink>
                    </div>
                    <div className={classes.NavigationItem}>
                        <NavLink to={
                                `/user/${ this.props.match.params.username}/followers`} exact
                                 className={classes.NavLink}
                                 activeClassName={classes.NavLinkActive}>
                                 <h4>Followers</h4>
                        </NavLink>
                    </div>
                </div>
                <InfiniteScroll
                    next={ () => {
                        if(this.props.linkToLoadMore){
                            this.loadMore();
                        }
                    }}
                    hasMore={this.props.hasMore}
                    loader={<Spinner />}
                    dataLength={this.props.users.length}
                    endMessage={ this.props.users.length > 0 ?
                        (this.props.users.length < 10 ? null :
                            (<p style={{textAlign: 'center',
                            marginTop: '0.5em',
                            marginBottom: '4em',
                            color: '#AAB8C2'}}>
                            You have seen it all!
                        </p>)) :
                        (this.props.type === 'following' ?
                            (<h2
                            style={{
                                textAlign: 'center',
                                margin: '2em 0'
                            }}>
                            No following.
                        </h2>) :
                                (<h2
                                    style={{
                                        textAlign: 'center',
                                        margin: '2em 0'
                                    }}>
                                    No followers.
                                </h2>))
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
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pickedUser: state.users.pickedUser,
    users: state.users.usersFollow,
    linkToLoadMore: state.users.linkToLoadMoreFollow,
    hasMore: state.users.hasMoreFollow,

});

const mapDispatchToProps = dispatch => ({
    clearUser: () => dispatch(usersActions.clearPickedUser()),
    loadUserWithFollowing: (username) => dispatch(
        usersActions.fetchUserWithFollowingOrFollowers(username, true)),
    loadUserWithFollowers: (username) => dispatch(
        usersActions.fetchUserWithFollowingOrFollowers(username, false)),
    loadMoreFollow: (link) => dispatch(
        usersActions.fetchMoreFollowingAndFollowersUserList(link))

});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Follow));
