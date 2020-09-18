import React from "react";
import classes from './CreatePost.module.css';
import {connect} from "react-redux";
import Avatar from "../../../components/Images/Avatar/Avatar";
import Input from '../../../components/UI/Input/Input';
import NavigationCreatePost from "../../../components/NavigationsCreatePost/NavigationsCreatePost";
import {createError} from "../../../store/actions/messages";
import {createPost} from '../../../store/actions/posts';


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
                maxLength: 280,
            },
            valid: false,
            touched: false
        },
        pictures: [],
    }

    pictureUploadHandler = (picturesList) => {
        this.setState({pictures: picturesList});
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules) {
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }
            if (rules.maxLength) {
                isValid = value.length < rules.maxLength && isValid;
            }
        }
        return isValid;
    }

    contentChangedHandler = event => {
        const updatedContent = {...this.state.content};
        updatedContent.value = event.target.value;
        updatedContent.valid = this.checkValidity(updatedContent.value,
            updatedContent.validation);
        updatedContent.touched = true;
        if(updatedContent.value.length === 0){
            updatedContent.touched = false;
        }

        this.setState({content: updatedContent});
    }

    submitHandler = (event) => {
        event.preventDefault();
        if(!this.state.content.valid){
            this.props.createError('badCreditsRegistration', 'Cannot perform');
        }
        else{
            const formData = new FormData();
            formData.append('content', this.state.content.value);
            if(this.state.pictures[0]) {
                formData.append('image', this.state.pictures[0].file);
            }
            this.props.createPost(formData);
        }
        this.setState({content:
                                {...this.state.content,
                                    value: ''},
                            pictures: []
                            });
    }

    render() {
        let avatar = (<Avatar loading={true} blank={false}/>);
        if(this.props.user){
            if(this.props.user.photo){
                avatar = (<Avatar link={this.props.user.photo}/>);
            }
            else{
                avatar = (<Avatar blank={true} /> );
            }
        }
        return(
            <div className={classes.ContainerOutside}>
                <div className={classes.ContainerInside}>
                    {avatar}
                    <Input elementType={this.state.content.elementType}
                           elementConfig={this.state.content.elementConfig}
                           maxLength={this.state.content.validation.maxLength}
                           value={this.state.content.value}
                           changed = {event => (this.contentChangedHandler(event))}

                           shouldValidate={true}
                           touched={this.state.content.touched}
                           invalid={!this.state.content.valid}
                           createPost={true}/>
                </div>
                <NavigationCreatePost
                    pictureUpload={this.pictureUploadHandler}
                    tranparentButtons={false}
                    images={this.state.pictures}
                    sumbit={this.submitHandler}/>

            </div>
        );
    }
}

const mapStateToProps = (state) => (
    {
        user: state.auth.user
    }
);

const mapDispatchToProps = (dispatch) => (
    {
        createPost: (form) => dispatch(createPost(form)),
        createError: (msg, body) => dispatch(createError(msg, body))
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
