import React from "react";
import classes from './UserDetail.module.css';
import Avatar from "../images/Avatar/Avatar";
import FollowButton from "../UI/StandardButton/FollowButton/FollowButton";


const userDetail = (props) => {

    return (
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
                <Avatar link={props.user.photo}
                        bigOne={true}/>

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

                    <FollowButton />
                </div>
            </div>

        </div>
    );
}

export default userDetail;