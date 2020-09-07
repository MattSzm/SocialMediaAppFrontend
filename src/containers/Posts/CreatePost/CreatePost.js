import React from "react";
import classes from './CreatePost.module.css';
import {connect} from "react-redux";
import Avatar from "../../../components/Avatar/Avatar";
import Input from '../../../components/UI/Input/Input';


class CreatePost extends React.Component{

    render() {
        return(
            <div className={classes.Container}>
                {this.props.user ?
                    <Avatar link={this.props.user.photo} /> : null}
                    <Input elementType={'textarea'}
                            createPost={true}/>
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        user: state.auth.user
    }
);

export default connect(mapStateToProps)(CreatePost);
