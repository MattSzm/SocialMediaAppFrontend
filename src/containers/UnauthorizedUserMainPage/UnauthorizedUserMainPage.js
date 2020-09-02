import React from "react";
import Modal from '../../components/UI/Modal/Modal';
import { connect } from 'react-redux';
import * as modalActions from '../../store/actions/modal';
import AuthButton from '../../components/UI/AuthButton/AuthButton';
import classes from './UnauthorizedUserMainPage.module.css';


class UnauthorizedUserMainPage extends React.Component{


    render() {
        return (
            <div className={classes.UnauthorizedUserMainPage}>
                <Modal show={this.props.showModal}
                        closeModalAndBackdrop={this.props.modalToggle.bind(this)}
                        dark={true}>
                    <div style={{height: '15em'}}>LOGIN PANEL</div>
                </Modal>

               <div className={classes.Buttons}>
                    <AuthButton
                        click={this.props.modalToggle.bind(this)}>
                        Login
                    </AuthButton>
                    <AuthButton
                        click={this.props.modalToggle.bind(this)}>
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