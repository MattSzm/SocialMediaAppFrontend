import React from "react";
import classes from './CreatePost.module.css';
import {connect} from "react-redux";
import Avatar from "../../../components/Avatar/Avatar";
import Input from '../../../components/UI/Input/Input';
import NavigationCreatePost from "../../../components/NavigationsCreatePost/NavigationsCreatePost";

class CreatePost extends React.Component{
    state = {
        content: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                placeholder: `What's happening?`
            },
            value: '',
            validation: {
                required: true,
                minLength: 0,
                maxLength: 280
            },
            valid: false
        },
        picture: null

    }

    pictureUploadHandler = (picture) => {
        this.setState({picture: picture});
        console.log(this.state.picture);
    }


    render() {
        return(
            <div className={classes.ContainerOutside}>
                <div className={classes.ContainerInside}>
                    {this.props.user ?
                        <Avatar link={this.props.user.photo} /> : null}
                        <Input elementType={'textarea'}
                                createPost={true}/>
                </div>
                <NavigationCreatePost
                    pictureUpload={this.pictureUploadHandler} />

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
