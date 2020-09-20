import React from "react";
import classes from './UserItemFollow.module.css';
import Avatar from "../../Images/Avatar/Avatar";



const userItemFollow = (props) => {
    let avatar = (
            <Avatar
                blank={true}
                loading={false} />);
    if(props.image){
        avatar = (<Avatar
            link={props.image} />);
    }
    return (
        <div className={classes.UserItem}>
            {avatar}
            <div className={classes.Content}>
                <h4>{props.username}</h4>
                <p>@{props.usernameDisplayed}</p>
            </div>
        </div>
    );
}


export default userItemFollow;