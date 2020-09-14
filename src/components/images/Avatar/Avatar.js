import React from "react";
import classes from './Avatar.module.css';
import avatarPlaceholder from '../../../assets/avatar_placeholder.png';

const avatar = (props) => {
    let src = props.link;
    let className = classes.Avatar;
    if(props.bigOne){
        className = classes.AvatarBigOne;
    }
    if(props.blank){
        src = avatarPlaceholder;
    }

    return (
        <div className={className}>
            {props.loading ? (<img className={classes.loading}
                                   src={avatarPlaceholder}/>) :
                <img src={src}/>}
        </div>
    );
}

export default avatar;