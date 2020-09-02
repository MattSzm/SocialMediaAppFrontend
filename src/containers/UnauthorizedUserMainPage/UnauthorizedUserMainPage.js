import React from "react";
import Modal from '../../components/UI/Modal/Modal';
import { connect } from 'react-redux';
import * as modalActions from '../../store/actions/modal';
import AuthButton from '../../components/UI/AuthButton/AuthButton';
import classes from './UnauthorizedUserMainPage.module.css';
import Login from "../Auth/Login/Login";


class UnauthorizedUserMainPage extends React.Component{


    render() {
        return (
            <div className={classes.UnauthorizedUserMainPage}>
                <Modal show={this.props.showModal}
                        closeModalAndBackdrop={this.props.modalToggle.bind(this)}
                        dark={true}>

                    <Login />

                </Modal>

               <div className={classes.Buttons}>
                    <AuthButton
                        click={this.props.modalToggle.bind(this)}
                        withAnimation={true}>
                        Login
                    </AuthButton>

                    <AuthButton
                        withAnimation={true}>
                        Register
                    </AuthButton>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => (
    {
        showModal: state.modal.showModal
    }
)

const mapDispatchToProps = dispatch => (
    {
        modalToggle: () => dispatch(modalActions.modalToggle())
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(UnauthorizedUserMainPage);