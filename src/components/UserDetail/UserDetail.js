import React, {Fragment} from "react";
import classes from './UserDetail.module.css';
import Avatar from "../Images/Avatar/Avatar";
import Button from '../UI/StandardButton/StandardButton';
import FollowButton from "../UI/StandardButton/FollowButton/FollowButton";
import {Link} from "react-router-dom";
import UserHeader from "./UserHeader/UserHeader";


const userDetail = (props) => {
    let content = (
        <div className={classes.UserDetail}>
            <UserHeader loading={true} />
            <div className={classes.Info}>
                <Avatar loading={true}
                        blank={false}
                        bigOne={true}/>
                <div className={classes.Follows}>
                    <div className={classes.Names}>
                        <h3 className={classes.loading}
                            style={{
                                width: '9em',
                                marginLeft: '0',
                            }}>
                            ...
                        </h3>
                        <p style={{
                            marginTop: '-1em'
                        }}>
                            @<span className={classes.loading}>
                                ........................
                            </span>
                        </p>
                    </div>
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
                              blank={false}
                              bigOne={true} />);
        }
        content = (
            <div className={classes.UserDetail}>
                <UserHeader loading={false}
                            usernameDisplayes={props.user.username_displayed}
                            NumberOfTweets={props.user.number_of_tweets}/>
                <div className={classes.Info}>
                    {avatar}
                    <div className={classes.Follows}>
                        <div className={classes.Names}>
                            <Link to={`/user/${props.user.username}`}
                                  style={{ textDecoration: 'none',
                                      color: '#14171A'}}>
                                <h3>{props.user.username_displayed}</h3>
                                <p style={{
                                    marginTop: '-1em'
                                    }}>
                                    @{props.user.username}
                                </p>
                            </Link>
                            <div className={classes.Settings}>
                                {props.worksAsProfile ? <Button
                                    click={props.openModal}
                                    isGrey={true}
                                    isTransparent={false}>Edit profile</Button> : null}
                            </div>

                        </div>
                        <div>
                            <div className={classes.InlineContainer}>
                                <p className={classes.Inline}>
                                    <Link to={`/user/${props.user.username}/following`}
                                        style={{textDecoration: 'none',
                                        color: '#14171A'}}>
                                        <strong style={{color: '#14171A'}}>
                                            {props.user.number_following}
                                        </strong> Following
                                    </Link>
                                </p>
                                <p className={classes.Inline}>
                                    <Link to={`/user/${props.user.username}/followers`}
                                          style={{textDecoration: 'none',
                                              color: '#14171A'}}>
                                        <strong style={{color: '#14171A'}}>
                                            {props.user.number_followers}
                                        </strong> Followers
                                    </Link>
                                </p>
                            </div>
                        </div>
                        {!props.worksAsProfile ?
                            <FollowButton
                                alreadyFollow={props.user.followed_by_current_user}
                                click={props.performFolllowAction}
                            />
                                : null
                        }
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