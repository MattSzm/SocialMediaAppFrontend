import React, {Fragment} from "react";
import classes from './UserDetail.module.css';
import Avatar from "../images/Avatar/Avatar";
import FollowButton from "../UI/StandardButton/FollowButton/FollowButton";


const userDetail = (props) => {
    let content = (
        <div className={classes.UserDetail}>
            <div className={classes.Title}>
                <h2 className={classes.loading}>
                    .................
                </h2>
                <p>
                    <small>
                        <span className={classes.loading}>........</span>Tweets
                    </small>
                </p>
            </div>
            <div className={classes.Info}>
                <Avatar loading={true}
                        blank={false}
                        bigOne={true}/>
                <div className={classes.Follows}>
                    <div className={classes.InlineContainer}>
                        <p className={classes.Inline}>
                            <strong className={classes.loading}
                                style={{color: '#E1E8ED'}}>
                                .........
                            </strong> Following
                        </p>
                        <p className={classes.Inline}>
                            <strong className={classes.loading}
                                style={{color: '#E1E8ED'}}>
                                .........
                            </strong> Followers
                        </p>
                    </div>
                    <FollowButton alreadyFollow={false}/>
                </div>
            </div>
        </div>
    );
    if(!props.loading){
        let avatar = (<Avatar blank={true}
                              bigOne={true} />);
        if(props.user.photo){
            avatar = (<Avatar link={props.user.photo}
                              bigOne={true} />);
        }
        content = (
            <div className={classes.UserDetail}>
                <div className={classes.Title}>
                    <h2>
                        {props.user.username_displayed}
                    </h2>
                    <p>
                        <small>
                            {props.user.number_of_tweets} Tweets
                        </small>
                    </p>
                </div>
                <div className={classes.Info}>
                    {avatar}
                    <div className={classes.Follows}>
                        <div className={classes.InlineContainer}>
                            <p className={classes.Inline}>
                                <strong style={{color: '#14171A'}}>
                                    {props.user.number_following}
                                </strong> Following
                            </p>
                            <p className={classes.Inline}>
                                <strong style={{color: '#14171A'}}>
                                    {props.user.number_followers}
                                </strong> Followers
                            </p>
                        </div>
                        <FollowButton alreadyFollow={props.user.followed_by_current_user}/>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Fragment>
            {content}
        </Fragment>
    );
}

export default userDetail;