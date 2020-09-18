import React, {Component} from "react";
import classesCreatePost from '../../Posts/CreatePost/CreatePost.module.css';
import {connect} from "react-redux";
import Avatar from "../../../components/Images/Avatar/Avatar";
import Input from '../../../components/UI/Input/Input';
import NavigationCreatePost from "../../../components/NavigationsCreatePost/NavigationsCreatePost";
import {createError} from "../../../store/actions/messages";
import {createComment} from "../../../store/actions/comments";
import Spinner from "../../../components/UI/Spinner/Spinner";


class CreateComment extends Component {
    state = {
        content: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                placeholder: `Type to comment...`
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

    submitHandler = (event) => {
        event.preventDefault();
        if(!this.state.content.valid){
            this.props.createError('badCreditsRegistration', 'Cannot perform');
        }
        else{
            const formData = new FormData();
            formData.append('comment_content', this.state.content.value);
            if(this.state.pictures[0]) {
                formData.append('image', this.state.pictures[0].file);
            }
            this.props.createComment(formData, this.props.postUuid);
        }
        this.setState({content:
                {...this.state.content,
                    value: ''},
            pictures: []
        });
    }

    render() {
        let avatar = (<Avatar loading={true} blank={false}/>);
        if(this.props.currentUser){
            if(this.props.currentUser.photo){
                avatar = (<Avatar link={this.props.currentUser.photo}/>);
            }
            else{
                avatar = (<Avatar blank={true} /> );
            }
        }
        return (
            <div className={classesCreatePost.ContainerOutside}
                style={{
                    backgroundColor: '#F5F8FA'
                }}>
                <div className={classesCreatePost.ContainerInside}>
                    {avatar}
                    {this.props.loading ?
                        (<div style={{
                            margin: '-6em auto',
                            height: '0em',
                            textAlign: 'center'
                        }}>
                            <Spinner />
                        </div>)
                        :
                        (<Input elementType={this.state.content.elementType}
                           elementConfig={this.state.content.elementConfig}
                           maxLength={this.state.content.validation.maxLength}
                           value={this.state.content.value}
                           changed = {event => (this.contentChangedHandler(event))}

                           shouldValidate={true}
                           touched={this.state.content.touched}
                           invalid={!this.state.content.valid}
                           createPost={true}/>)}
                </div>
                <NavigationCreatePost
                    pictureUpload={this.pictureUploadHandler}
                    tranparentButtons={false}
                    images={this.state.pictures}
                    sumbit={this.submitHandler}
                    comment={true}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.auth.user,
    loading: state.comments.loadingCreateComment
});

const mapDispatchToProps = (dispatch) => (
    {
        createComment: (form, postUuid) => dispatch(createComment(form, postUuid)),
        createError: (msg, body) => dispatch(createError(msg, body))
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);