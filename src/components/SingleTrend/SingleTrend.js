import React from "react";
import classes from './SingleTrend.module.css';
import {Link} from "react-router-dom";


const singleTrend = (props) => {
    let content = (<div className={classes.Trend}>
                        <h4>
                            <Link to={`/hashtag/${props.value}`}
                                  style={{ textDecoration: 'none',
                                      color: 'inherit'}}>
                                #{props.value}
                            </Link>
                        </h4>
                        <p><small>{props.numberOfTweets} tweets</small></p>
                     </div>);
    if(props.explore){
        content = (<div className={classes.Trend}>
                        <h2>
                            <Link to={`/hashtag/${props.value}`}
                                  style={{ textDecoration: 'none',
                                      color: 'inherit'}}>
                                #{props.value}
                            </Link>
                        </h2>
                        <p><small style={{
                            marginLeft: '0.5em'
                        }}>{props.numberOfTweets} tweets</small></p>
                    </div>);
    }
    return (
        <div>
            {content}
        </div>
    );
}

export default singleTrend;