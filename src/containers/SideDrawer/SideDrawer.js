import React from "react";
import classes from './SideDrawer.module.css';
import Logo from "../../components/Logo/Logo";
import {connect} from 'react-redux';
import {logout} from '../../store/actions/auth';


class SideDrawer extends React.Component{

    render() {
        return (
            <div className={classes.SIdeDrawerContainer}>
                <div className={classes.SideDrawer}>
                    <Logo />
                    <ul>
                        <li className={[classes.SideDrawerItem, classes.active].join(' ')
                        }><h2><span>Home</span></h2></li>

                        <li className={classes.SideDrawerItem}>
                            <h2><span>Explore</span></h2></li>

                        <li className={classes.SideDrawerItem}>
                            <h2><span>Notifications</span></h2></li>

                        <li className={classes.SideDrawerItem}>
                            <h2><span>Profile</span></h2></li>

                        <li className={classes.SideDrawerItem}>
                            <h2><span onClick={this.props.logout}>Logout</span></h2></li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => (
    {
        logout: () => dispatch(logout()),
    }
);

export default connect(null, mapDispatchToProps)(SideDrawer);