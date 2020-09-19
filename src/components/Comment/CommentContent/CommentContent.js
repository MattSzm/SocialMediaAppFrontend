import React from "react";
import PostClasses from '../../PostContent/PostContent.module.css';
import Linkify from 'react-linkify'
import PostImage from "../../Images/PostImage/PostImage";
import {Link} from "react-router-dom";
import {hashtag_formatter} from "../../PostContent/PostContent";


const commentContent = (props) => {
    let date = props.date.substring(0,10) + ' ' +
        props.date.substring(11,16);
    return (
        <div className={PostClasses.PostContent}>
            {props.loading ? (<p className={PostClasses.bolded}>
                <span
                    className={PostClasses.loading}
                    style={{color: '#E1E8ED'}}>
                    ...........
                </span>
                    <span> @<span
                        className={PostClasses.loading}
                        style={{color: '#E1E8ED'}}>
                    ...........
                </span>
                        &#183; {date}</span></p>)
                :
                (<p className={PostClasses.bolded}>
                    <Link to={`/user/${props.username}`}
                          style={{ textDecoration: 'none',
                              color: '#14171A'}}>
                        {props.usernameDisplay}<span> @{props.username}
                    </span></Link>
                    <span>&#183; {date}</span>
                </p>)}
            <p>
                <Linkify fuzzyEmail={false}>
                    {hashtag_formatter(props.content)}
                </Linkify>
            </p>

            {props.imageLink ?
                (<PostImage link={props.imageLink} />) :
                null}
        </div>
    );
}

export default commentContent;
