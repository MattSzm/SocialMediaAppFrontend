import React from "react";
import classes from './ProfileHighlight.module.css';
import Avatar from "../Images/Avatar/Avatar";
import {withRouter} from 'react-router-dom';

const profileHighlight = (props) => {
    let profile = (
        <div className={classes.ProfileHighlight}>
            <Avatar blank={false}
                    loading={true}
                    />
                    <div className={classes.Content}>
                        <h4 className={classes.loading}>
                            .
                        </h4>
                        <p>@ <span className={classes.loading}
                                   style={{color: '#E1E8ED'}}>
                            .......................
                        </span></p>
                    </div>
        </div>
    );
    if(!props.loading){
        let avatar = (<Avatar blank={true}/>);
        if(props.photo){
            avatar = ( <Avatar link={props.photo}/>);
        }
        profile = (
            <div className={classes.ProfileHighlight}
                 onClick={() => {props.history.push('/profile')}}>
                {avatar}
                <div className={classes.Content}>
                    <h4>{props.usernameDisplay.length > 19 ?
                            props.usernameDisplay.substring(0, 15) + '...' :
                            props.usernameDisplay}
                    </h4>
                    <p>@{props.username.length > 18 ?
                            props.username.substring(0,14) + '...' :
                            props.username}</p>
                </div>
            </div>);
    }
    return (
        <div>
            {profile}
        </div>
    );
}

export default withRouter(profileHighlight);