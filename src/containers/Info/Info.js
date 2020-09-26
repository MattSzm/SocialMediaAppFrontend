import React, {Component} from "react";
import classes from './Info.module.css';
import SearchInput from "../SearchingInput/SearchingInput";
import {Link, withRouter} from 'react-router-dom';
import {loadPopularUsers, loadHashtagTrends} from '../../store/actions/info';
import {connect} from 'react-redux';
import UserItemFollow from "../../components/UserDetail/UserItemFollow/UserItemFollow";
import SingleTrend from "../../components/SingleTrend/SingleTrend";


class Info extends Component{
    componentDidMount() {
        this.props.loadPopularUsers();
        this.props.loadHashtagTrends();
    }

    render() {
        let usersContent =  <div className={classes.LoadingBlock}/>;
        if(this.props.popularUsers){
            usersContent = this.props.popularUsers.map(singleUser => (
               <UserItemFollow
                   key={singleUser.id}
                   username={singleUser.username}
                   usernameDisplayed={singleUser.username_displayed}
                   image={singleUser.photo}
                   worksAsInfo={true}/>)
            )}
        let trendsContent = <div className={classes.LoadingBlock} />;
        if(this.props.hashtagTrends){
            trendsContent = this.props.hashtagTrends.map(singleTrend => (
                <SingleTrend
                    key={singleTrend.hashtag_value}
                    value={singleTrend.hashtag_value}
                    numberOfTweets={singleTrend.number_tweets}
                />
            )
            )}
        return (
            <div className={classes.InfoContainer}>
                <div className={classes.Info}>
                    {this.props.location.pathname === '/explore' ? null :
                        <SearchInput/>
                    }
                    <ul>
                        <div className={classes.ContainerInside}>
                            <h3>Who to follow</h3>
                            <div className={classes.List}>
                                {usersContent}
                            </div>
                        </div>
                        {this.props.location.pathname === '/explore' ? null :
                            (<div className={classes.ContainerInside}>
                                <h3>Trends for you</h3>
                                <div className={classes.List}>
                                    {trendsContent}
                                </div>
                            </div>)
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    popularUsers: state.info.users,
    hashtagTrends: state.info.hashtags
});

const mapDispatchToProps = dispatch => ({
    loadPopularUsers: () => dispatch(loadPopularUsers()),
    loadHashtagTrends: () => dispatch(loadHashtagTrends(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Info));