import React from "react";
import classes from './Avatar.module.css';
import avatarPlaceholder from '../../assets/avatar_placeholder.png';

const avatar = (props) => {
    return (
        <div className={classes.Avatar}>
            {props.loading ? (<img className={classes.loading}
                                   src={avatarPlaceholder}/>) :
                <img src={props.link}/>}
        </div>
    );
}

export default avatar;