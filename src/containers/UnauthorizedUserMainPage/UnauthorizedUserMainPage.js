import React, {Component, Fragment} from "react";
import Modal from '../../components/UI/Modal/Modal';
import { connect } from 'react-redux';
import * as modalActions from '../../store/actions/modal';
import AuthButton from '../../components/UI/AuthButton/AuthButton';
import classes from './UnauthorizedUserMainPage.module.css';
import Login from "../Auth/Login/Login";
import background from '../../assets/background.png';
import background_color from '../../assets/background_color.png';
import logo from "../../assets/logo.png";

class UnauthorizedUserMainPage extends Component{


    render() {
        return (
            <Fragment>
                <Modal show={this.props.showModal}
                       closeModalAndBackdrop={this.props.modalToggle.bind(this)}
                       dark={true}>

                    <Login show={this.props.showModal}/>

                </Modal>

                <div className={classes.UnauthorizedUserMainPageContainer} >
                    <div className={classes.UnauthorizedUserMainPageLeft}>
                        <img src={background} className={classes.BigScreen}/>
                        <img src={background_color} className={classes.SmallScreen} />
                    </div>


                    <div className={classes.UnauthorizedUserMainPageRight}>
                        <div className={classes.Content}>
                            <h1>See what happens in the world!</h1>
                            <div className={classes.Buttons}>
                                <AuthButton
                                    click={this.props.modalToggle.bind(this)}
                                    blackWithSmallScreens={true}>
                                    Login
                                </AuthButton>

                                <AuthButton
                                    blackWithSmallScreens={true}>
                                    Register
                                </AuthButton>
                            </div>
                            <img src={logo} className={classes.SmallScreenLogo}/>
                        </div>
                    </div>
                </div>
            </Fragment>
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