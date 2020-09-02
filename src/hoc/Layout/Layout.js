import React from "react";
import classes from './Layout.module.css';
import SideDrawer from "../../containers/SideDrawer/SideDrawer";
import Posts from "../../containers/Posts/Posts";
import Info from "../../containers/Info/Info";
import MobileNavigation from "../../components/MobileNavigation/MobileNavigation";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from '../../components/UI/Modal/Modal';

class Layout extends React.Component{
    state = {show:false}
    logoutHandler = () => {
        this.setState(prevState => ({show: !prevState.show}));
    }

    render() {
        return(
            <React.Fragment>
                <Modal show={this.state.show}
                       closeModalAndBackdrop={this.logoutHandler.bind(this)}>
                    <h2>LOGIN PLACE </h2>
                    <h2>LOGIN PLACE </h2>
                    <h2>LOGIN PLACE </h2>
                    <h2>LOGIN PLACE </h2>
                </Modal>
                <div className={classes.Layout}>
                    <SideDrawer onLogout={this.logoutHandler.bind(this)}/>

                    <Posts />

                    <Info />
                </div>
                <MobileNavigation />
                <Spinner />
            </React.Fragment>
        );
    }
}

export default Layout;