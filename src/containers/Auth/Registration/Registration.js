import React from "react";
import classes from './Registration.module.css';
import { connect } from 'react-redux';
import Input from "../../../components/UI/Input/Input";
import Button from '../../../components/UI/StandardButton/StandardButton';
import * as actions from '../../../store/actions/auth';
import Spinner from '../../../components/UI/Spinner/Spinner';
import UploadImages from "../../../components/NavigationsCreatePost/UploadImages/UploadImages";
import {createError} from "../../../store/actions/messages";
import styled from "styled-components";


const SpaceStyledDiv = styled.div`
        display: inline;
        width: 4em;
        margin: 0 1em;
        @media (max-width: 600px){
           margin: 0em 0em; 
        }
    }`;


class Login extends React.Component{
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Username'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                    maxLength: 21
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            password2: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Repeat password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            usernameDisplayed: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Displayed username (can be changed)'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                    maxLength: 21
                },
                valid: false,
                touched: false
            },
        },
        pictures: []
    }

    pictureUploadHandler = (picturesList) => {
        this.setState({pictures: picturesList});
    }

    checkValidity(value, rules){
        let isValid = true;
        if (rules) {
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }
            if (rules.minLength) {
                isValid = value.length >= rules.minLength && isValid;
            }
            if (rules.maxLength) {
                isValid = value.length < rules.maxLength && isValid;
            }
        }
        return isValid;
    }

    checkValidityPasswords(firstPasswordValue, secondPasswordValue){
        if(firstPasswordValue === secondPasswordValue){
            return true;
        }
        return false;
    }

    checkFormValidity = () => {
        let valid = true;
        const keys = Object.keys(this.state.controls);
        for(let control of keys){
            valid = valid && this.state.controls[control].valid;
        }
        return valid;
    }

    inputChangedHandler = (event, controlName) => {
        if (controlName !== 'password2') {
            const updatedControls = {
                ...this.state.controls,
                [controlName]: {
                    ...this.state.controls[controlName],
                    value: event.target.value,
                    valid: this.checkValidity(event.target.value,
                        this.state.controls[controlName].validation),
                    touched: true
                }
            }
            this.setState({controls: updatedControls});
        }
        else {
            const updatedControls = {
                ...this.state.controls,
                password2: {
                    ...this.state.controls.password2,
                    value: event.target.value,
                    valid: (this.checkValidity(event.target.value,
                        this.state.controls.password2.validation) &&
                        this.checkValidityPasswords(event.target.value,
                            this.state.controls.password.value)),
                    touched: true
                }
            }
            this.setState({controls: updatedControls});
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        if(!this.checkFormValidity()){
            this.props.createError('badCreditsRegistration', 'Bad credentials');
        }
        else {
            const formData = new FormData();
            formData.append('email', this.state.controls.email.value);
            formData.append('username', this.state.controls.username.value);
            formData.append('username_displayed', this.state.controls.usernameDisplayed.value);
            formData.append('password', this.state.controls.password.value);
            if(this.state.pictures[0]) {
                formData.append('photo', this.state.pictures[0].file);
            }
            this.props.register(formData);
        }
    }

    render() {
        const formElementArray = []
        for(let key in this.state.controls){
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let formInputs = formElementArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => (this.inputChangedHandler(event,
                    formElement.id))}

                shouldValidate={true}
                touched={formElement.config.touched}
                invalid={!formElement.config.valid}
                colorGreen={true}
            />
        ));

        let form = <Spinner />;
        if(!this.props.loading){
            form = (
                <form>
                    {formInputs}
                    <UploadImages
                        upload={this.pictureUploadHandler}
                        images={this.state.pictures}
                        registration={true}
                        tranparentButtons={true}/>
                    <br/>
                    <br/>
                    <Button click={this.submitHandler}>
                        Sign up
                    </Button>
                    <SpaceStyledDiv />
                    <Button click={this.props.changeState}
                            isTransparent={true}>
                        Switch to Log in
                    </Button>
                </form>
            );
        }

        let content = null;
        if(this.props.show){
            content = (<div className={classes.Registration}>
                {form}
            </div>);
        }

        return (<React.Fragment>
            {content}
        </React.Fragment>);
    }

}

const mapStateToProps = (state) => (
    {
        loading: state.auth.loading
    }
);

const mapDispatchToProps = (dispatch) => (
    {
        register: (form) => dispatch(actions.register(form)),
        createError: (msg, body) => dispatch(createError(msg, body))
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Login)