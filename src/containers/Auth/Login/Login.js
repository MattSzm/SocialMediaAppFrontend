import React from "react";
import classes from './Login.module.css';
import { connect } from 'react-redux';
import Input from "../../../components/UI/Input/Input";
import Button from '../../../components/UI/StandardButton/StandardButton';
import * as actions from '../../../store/actions/auth';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styled from 'styled-components';


const SpaceStyledDiv = styled.div`
        display: inline;
        width: 4em;
        margin: 0 0.5em;
        @media (max-width: 600px){
           display: none 
        }
    }`;



class Login extends React.Component{
    state = {
        controls: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Username or Email'
                },
                value: '',
                validation: {
                    required: true,
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
                },
                valid: false,
                touched: false
            },
        },
    }
 
    checkValidity(value, rules){
        let isValid = true;
        if (rules) {
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }
        }
        return isValid;
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.Login(
            this.state.controls.username.value,
            this.state.controls.password.value
        )
        this.forceUpdate();
    }

    inputChangedHandler = (event, controlName) => {
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
                key ={formElement.id}
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
        ))
        let form = <Spinner />
        if(!this.props.loading){
            form = (
                <form>
                    {formInputs}
                    <br/>
                    <Button click={this.submitHandler}>
                        Log in
                    </Button>
                    <SpaceStyledDiv />
                    <div className={classes.FreeSpace}>
                        <br />
                    </div>
                    <Button click={this.props.changeState}
                            isTransparent={true}>
                        Switch to Sign up
                    </Button>
                </form>
            );
        }
        let content = null;
        if(this.props.show){
             content = (<div className={classes.Login}>
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
        Login: (username, password) => dispatch(actions.login(username, password))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Login)