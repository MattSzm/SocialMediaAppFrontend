import React from "react";
import classes from './UserDetail.module.css';
import Avatar from "../images/Avatar/Avatar";


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
            </div>

        </div>
    );
}

export default userDetail;