import React from "react";
import classes from './SideDrawer.module.css';
import Logo from "../../components/Logo/Logo";
import {connect} from 'react-redux';
import {logout} from '../../store/actions/auth';
import {NavLink} from "react-router-dom";

class SideDrawer extends React.Component{

    render() {
        return (
            <div className={classes.SIdeDrawerContainer}>
                <div className={classes.SideDrawer}>
                    <Logo />
                    <ul>
                        <NavLink to="/"
                                 className={classes.SideDrawerItem}
                                 activeClassName={classes.Active}>
                            <h2><span>Home</span></h2>
                        </NavLink>

                        <NavLink to="/explore"
                                 className={classes.SideDrawerItem}
                                 activeClassName={classes.Active}>
                            <h2><span>Explore</span></h2>
                        </NavLink>

                        {/*<NavLink to="/notifications"*/}
                        {/*         className={classes.SideDrawerItem}*/}
                        {/*         activeClassName={classes.Active}>*/}
                        {/*    <h2><span>Notifications</span></h2>*/}
                        {/*</NavLink>*/}

                        <NavLink to="/profile"
                                 className={classes.SideDrawerItem}
                                 activeClassName={classes.Active}>
                            <h2><span>Profile</span></h2>
                        </NavLink>

                        <NavLink to="/logout"
                                 className={classes.SideDrawerItem}
                                 activeClassName={classes.Active}>
                            <h2><span onClick={this.props.logout}>Logout</span></h2>
                        </NavLink>
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