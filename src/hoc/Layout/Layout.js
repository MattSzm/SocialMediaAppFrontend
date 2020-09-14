import React from "react";
import classes from './Layout.module.css';
import SideDrawer from "../../containers/SideDrawer/SideDrawer";
import NewsFeed from "../../containers/Posts/NewsFeed/NewsFeed";
import Info from "../../containers/Info/Info";
import Modal from '../../components/UI/Modal/Modal';
import { connect } from 'react-redux';
import * as modalActions from '../../store/actions/modal';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserPage from "../../containers/Posts/UserPage/UserPage";


class Layout extends React.Component{

    render() {
        return(
            <React.Fragment>
                <Modal show={this.props.showModal}
                       closeModalAndBackdrop={this.props.modalToggle.bind(this)}>
                        <h2>MODALPLACEHOLDER</h2>
                </Modal>


                <div className={classes.Layout}>
                    <SideDrawer/>

                    <Switch>
                        <Route path="/" exact component={NewsFeed} />
                        <Route path="/user/:username" component={UserPage} />
                    </Switch>

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