import React from "react";
import classes from './Layout.module.css';
import SideDrawer from "../../containers/SideDrawer/SideDrawer";
import Posts from "../../containers/Posts/NewsFeed";
import Info from "../../containers/Info/Info";
import MobileNavigation from "../../components/MobileNavigation/MobileNavigation";
import Modal from '../../components/UI/Modal/Modal';
import { connect } from 'react-redux';
import * as modalActions from '../../store/actions/modal';


class Layout extends React.Component{

    render() {
        // console.log(this.props.history);
        return(
            <React.Fragment>
                <Modal show={this.props.showModal}
                       closeModalAndBackdrop={this.props.modalToggle.bind(this)}>
                        <h2>MODALPLACEHOLDER</h2>
                </Modal>


                <div className={classes.Layout}>
                    <SideDrawer/>

                    <Posts />

                    <Info />
                </div>

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => (
    {
        showModal: state.modal.showModal,
        user: state.auth.user
    }
);

const mapDispatchToProps = dispatch => (
    {
        modalToggle: () => dispatch(modalActions.modalToggle())
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);