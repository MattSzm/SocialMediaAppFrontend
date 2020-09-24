import React from "react";
import classes from './UserItemFollow.module.css';
import Avatar from "../../Images/Avatar/Avatar";
import {Link} from "react-router-dom";


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
        <div className={props.worksAsInfo ? classes.InfoUserItem : classes.UserItem}>
            <div>
            {avatar}
            </div>
            <div className={props.worksAsInfo ? classes.InfoContent : classes.Content}>
                <Link to={`/user/${props.username}`}
                      style={{ textDecoration: 'none',
                          color: '#14171A'}}>
                    <h4>{props.usernameDisplayed}</h4>
                    <p style={{
                        color: '#657786'
                    }}
                    >@{props.username}</p>
                </Link>
            </div>
        </div>
    );
}


export default userItemFollow;