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
import Footer from "../../components/UI/Footer/Footer";
import Registration from "../Auth/Registration/Registration";

class UnauthorizedUserMainPage extends Component{
    state = {
        showLogin: false,
        showRegistration: false
    }

    showLoginHandler = () => {
        this.setState({showLogin: true});
        this.props.modalToggle();
    }

    showRegistrationHandler = () => {
        this.setState({showRegistration: true});
        this.props.modalToggle();
    }

    closeModalAndBackdrop = () => {
        this.setState({
            showLogin: false,
            showRegistration: false
        });
        this.props.modalToggle();
    }

    changeLogReg = () => {
        this.setState(prevState => ({showLogin: !prevState.showLogin,
                                        showRegistration: !prevState.showRegistration}))
    }

    render() {
        return (
            <Fragment>
                <Modal show={this.props.showModal}
                       closeModalAndBackdrop={this.closeModalAndBackdrop.bind(this)}
                       dark={true}>
                    <Login
                        show={this.state.showLogin}
                        changeState={this.changeLogReg}/>
                    <Registration
                        show={this.state.showRegistration}
                        changeState={this.changeLogReg}/>
                </Modal>

                <div className={classes.UnauthorizedUserMainPageContainer} >
                    <div className={classes.UnauthorizedUserMainPageExtraLeft}>
                        <img src={background_color} />
                    </div>

                    <div className={classes.UnauthorizedUserMainPageLeft}>
                        <img src={background} className={classes.BigScreen}/>
                        <img src={background_color} className={classes.SmallScreen} />
                    </div>


                    <div className={classes.UnauthorizedUserMainPageRight}>
                        <div className={classes.Content}>
                            <h1>See what happens in the world!</h1>
                            <div className={classes.Buttons}>
                                <AuthButton
                                    click={this.showLoginHandler.bind(this)}
                                    blackWithSmallScreens={true}>
                                    Log in
                                </AuthButton>

                                <AuthButton
                                    click={this.showRegistrationHandler.bind(this)}
                                    blackWithSmallScreens={true}>
                                    Sign up
                                </AuthButton>
                            </div>
                            <img src={logo} className={classes.SmallScreenLogo}/>
                        </div>
                    </div>
                    <Footer />
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