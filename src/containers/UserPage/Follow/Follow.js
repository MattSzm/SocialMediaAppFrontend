import React,{Component} from "react";
import classes from './Follow.module.css';
import {connect} from 'react-redux';
import UserHeader from "../../../components/UserDetail/UserHeader/UserHeader";
import {NavLink, withRouter} from "react-router-dom";
import Spinner from "../../../components/UI/Spinner/Spinner";
import * as usersActions from '../../../store/actions/users';
import InfiniteScroll from "react-infinite-scroll-component";


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

    render() {
        let userHeader = <UserHeader loading={true} />;
        if(this.props.pickedUser){
            userHeader = <UserHeader
                            loading={false}
                            usernameDisplayes={this.props.pickedUser.username_displayed}
                            NumberOfTweets={this.props.pickedUser.number_of_tweets}/>;
        }
        if (this.props.users){
            console.log(this.props.users);
        }
        return (
            <div className={classes.Follow}>
                <div className={classes.Header}>
                    {userHeader}
                </div>
                <div className={classes.Navigations}>
                    <div className={classes.NavigationItem}>
                            <NavLink to={
                                this.props.pickedUser ?
                                `/user/${this.props.pickedUser.username}/following` :
                                ''} exact
                                className={classes.Navlink}
                                 activeClassName={classes.NavlinkActive}>
                                <h4>Following</h4>
                            </NavLink>
                    </div>
                    <div className={classes.NavigationItem}>
                        <NavLink to={
                            this.props.pickedUser ?
                                `/user/${this.props.pickedUser.username}/followers` :
                                ''} exact
                                 className={classes.Navlink}
                                 activeClassName={classes.NavlinkActive}>
                                 <h4>Followers</h4>
                        </NavLink>
                    </div>
                </div>
                {/*<InfiniteScroll */}
                {/*    next={} hasMore={} loader={} dataLength={}*/}

            </div>
        );
    }
}

const mapStateToProps = state => ({
    pickedUser: state.users.pickedUser,
    users: state.users.usersFollow,
    hasMore: state.users.hasMoreFollow,
    linkToLoadMore: state.users.linkToLoadMoreFollow

});

const mapDispatchToProps = dispatch => ({
    clearUser: () => dispatch(usersActions.clearPickedUser()),
    loadUserWithFollowing: (username) => dispatch(
        usersActions.fetchUserWithFollowingOrFollowers(username, true)),
    loadUserWithFollowers: (username) => dispatch(
        usersActions.fetchUserWithFollowingOrFollowers(username, false))

});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Follow));
