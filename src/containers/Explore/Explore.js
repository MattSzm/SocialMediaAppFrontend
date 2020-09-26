import React, {Component} from "react";
import {connect} from 'react-redux';
import NewsfeedClasses from '../../containers/Posts/NewsFeed/NewsFeed.module.css';
import SearchInput from "../SearchingInput/SearchingInput";
import Spinner from "../../components/UI/Spinner/Spinner";
import SingleTrend from "../../components/SingleTrend/SingleTrend";
import {loadHashtagTrends} from "../../store/actions/info";
import Post from "../Posts/Post/Post";
import UserItemFollow from "../../components/UserDetail/UserItemFollow/UserItemFollow";


class Explore extends Component {
    componentDidMount() {
        this.props.loadHashtagTrends();
    }

    render() {
        let usersContent =  <Spinner />;
        if(this.props.popularUsers){
            usersContent = this.props.popularUsers.map(singleUser => (
                <UserItemFollow
                    key={singleUser.id}
                    username={singleUser.username}
                    usernameDisplayed={singleUser.username_displayed}
                    image={singleUser.photo}
                   />)
            )}


        let trendsContent = <Spinner />;
        if(this.props.hashtagTrends.length > 0 && this.props.posts.length > 0) {
            trendsContent = this.props.hashtagTrends.map(singleTrend => {
                if (this.props.users[`${singleTrend.most_popular.user}`.substring(36,
                    singleTrend.most_popular.user.length - 1)]) {
                    return (
                        <div
                            key={singleTrend.hashtag_value}>
                            <div style={{
                                textAlign: 'left',
                                marginLeft: '1em'
                            }}>
                                <SingleTrend
                                    value={singleTrend.hashtag_value}
                                    numberOfTweets={singleTrend.number_tweets}
                                    explore={true}
                                />
                            </div>
                            { this.props.posts.find(x => x.uuid === singleTrend.most_popular.uuid) ?
                                (<Post
                                    post={
                                        this.props.posts.find(x => x.uuid === singleTrend.most_popular.uuid)}
                                    user={this.props.users[`${singleTrend.most_popular.user}`.substring(36,
                                        singleTrend.most_popular.user.length - 1)]}
                                    explore={true}
                                />) : null }
                        </div>
                    );
                } else {
                    return (
                        <div
                            key={singleTrend.hashtag_value}>
                            <div style={{
                                textAlign: 'left',
                                marginLeft: '1em'
                            }}>
                                <SingleTrend
                                    value={singleTrend.hashtag_value}
                                    numberOfTweets={singleTrend.number_tweets}
                                    explore={true}
                                />
                            </div>
                            <Spinner />
                        </div>
                    );
                }
            })
        }
        return (
            <div className={NewsfeedClasses.NewsFeed}>
                <div className={NewsfeedClasses.ContainerTitle}>
                    <div className={NewsfeedClasses.Title}>
                        <SearchInput explore={true}/>
                    </div>
                </div>
                <div className={NewsfeedClasses.EmptySpace}/>

                <h2>Trends for you</h2>
                {trendsContent}

                <h2>Who to follow</h2>
                {usersContent}

                <div className={NewsfeedClasses.EmptySpace}/>
                <div className={NewsfeedClasses.EmptySpace}/>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    users: state.users.users,
    posts: state.posts.posts,
    popularUsers: state.info.users,
    hashtagTrends: state.info.hashtags
});

const mapDispatchToProps = dispatch => ({
    loadHashtagTrends: () => dispatch(loadHashtagTrends(true))
});

export default connect(mapStateToProps, mapDispatchToProps)(Explore);