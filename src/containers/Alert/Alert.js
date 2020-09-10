import React, {Component, Fragment} from "react";
import {withAlert} from "react-alert";
import {connect} from 'react-redux';


class Alert extends Component{
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { error, alert, message } = this.props;
        if(error !== prevProps.error){
            if(error.message.username){
                alert.error('Username or e-mail is required');
            }
            if(error.message.password){
                alert.error('Password is required');
            }
            if(error.message.non_field_errors){
                alert.error(error.message.non_field_errors);
            }
            if(error.message.newsfeed){
                alert.error(error.message.newsfeed);
            }
            if(error.message.badCreditsRegistration){
                alert.error(error.message.badCreditsRegistration);
            }
            if(error.status === 500){
                alert.error('Error');
            }
        }
        if(message !== prevProps.message){
            if(message.loggedIn){
                alert.success(message.loggedIn);
            }
            if(message.loggedOut){
                alert.success(message.loggedOut);
            }
        }
    }

    render() {
        return (
            <Fragment />
        );
    }
}
const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alert));