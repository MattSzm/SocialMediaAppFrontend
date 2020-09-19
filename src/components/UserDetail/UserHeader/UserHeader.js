import React, {Fragment} from "react";
import classes from '../UserDetail.module.css';


const userHeader = (props) => {
    let content = (
        <div className={classes.ContainerTitle} >
            <div className={classes.Title}>
                <h2 className={classes.loading}
                    style={{
                        width: '7em',
                        marginLeft: '0'
                    }}>
                    .
                </h2>
                <p>
                    <small>
                        <span className={classes.loading}>........</span>Tweets
                    </small>
                </p>
            </div>
        </div>
    );
    if(!props.loading){
        content = (
            <div className={classes.ContainerTitle} >
                <div className={classes.Title}>
                    <h2>
                        {props.usernameDisplayes}
                    </h2>
                    <p>
                        <small>
                            {props.NumberOfTweets} Tweets
                        </small>
                    </p>
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

export default userHeader;
