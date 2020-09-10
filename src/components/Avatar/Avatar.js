import React from "react";
import classes from './Avatar.module.css';
import avatarPlaceholder from '../../assets/avatar_placeholder.png';

const avatar = (props) => {
    let src = props.link;
    if(props.blank){
        src = avatarPlaceholder;
    }

    return (
        <div className={classes.Avatar}>
            {props.loading ? (<img className={classes.loading}
                                   src={avatarPlaceholder}/>) :
                <img src={src}/>}
        </div>
    );
}

export default avatar;