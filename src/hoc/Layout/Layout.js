import React from "react";
import classes from './Layout.module.css';
import SideDrawer from "../../containers/SideDrawer/SideDrawer";
import Posts from "../../containers/Posts/Posts";
import Info from "../../containers/Info/Info";
import MobileNavigation from "../../components/MobileNavigation/MobileNavigation";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from '../../components/UI/Modal/Modal';
import { connect } from 'react-redux';
import * as modalActions from '../../store/actions/modal';


class Layout extends React.Component{

    render() {
        return(
            <React.Fragment>
                <Modal show={this.props.showModal}
                       closeModalAndBackdrop={this.props.modalToggle.bind(this)}>
                    <h2>LOGIN PLACE </h2>
                    <h2>LOGIN PLACE </h2>
                    <h2>LOGIN PLACE </h2>
                    <h2>LOGIN PLACE </h2>
                </Modal>
                <div className={classes.Layout}>
                    <SideDrawer
                        onLogout={this.props.modalToggle.bind(this)}/>

                    <Posts />

                    <Info />
                </div>
                <MobileNavigation />
                <Spinner />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => (
    {
        showModal: state.modal.showModal
    }
);

const mapDispatchToProps = dispatch => (
    {
        modalToggle: () => dispatch(modalActions.modalToggle())
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);