import React from "react";
import classes from './SideDrawer.module.css';
import Logo from "../../components/Logo/Logo";
import {connect} from 'react-redux';
import {logout} from '../../store/actions/auth';
import {NavLink} from "react-router-dom";
import homeLogo from '../../assets/icons/home.png';
import exploreLogo from '../../assets/icons/explore.png';
import profileLogo from '../../assets/icons/profile.png';
import logoutLogo from '../../assets/icons/logout.png';
import MobileNavigation from "../../components/MobileNavigation/MobileNavigation";


class SideDrawer extends React.Component{

    render() {

        return (
            <React.Fragment>
                <div className={classes.SIdeDrawerContainer}>
                    <div className={classes.SideDrawer}>
                        <Logo />
                        <ul>
                            <NavLink to="/" exact
                                     className={classes.SideDrawerItem}
                                     activeClassName={classes.Active}>
                                <h2>
                                    <span className={classes.Hovered}>
                                        <img src={homeLogo} />
                                        <span className={classes.disappearOnSmallScreens}>
                                            Home
                                        </span>
                                    </span>
                                </h2>
                            </NavLink>

                            <NavLink to="/explore"
                                     className={classes.SideDrawerItem}
                                     activeClassName={classes.Active}>
                                <h2>
                                    <span className={classes.Hovered}>
                                        <img src={exploreLogo} />
                                        <span className={classes.disappearOnSmallScreens}>
                                            Explore
                                        </span>
                                    </span>
                                </h2>
                            </NavLink>

                            {/*<NavLink to="/notifications"*/}
                            {/*         className={classes.SideDrawerItem}*/}
                            {/*         activeClassName={classes.Active}>*/}
                            {/*    <h2><span>Notifications</span></h2>*/}
                            {/*</NavLink>*/}

                            <NavLink to="/profile"
                                     className={classes.SideDrawerItem}
                                     activeClassName={classes.Active}>
                                <h2>
                                    <span className={classes.Hovered}>
                                        <img src={profileLogo} />
                                        <span className={classes.disappearOnSmallScreens}>
                                            Profile
                                        </span>
                                    </span>
                                </h2>
                            </NavLink>

                            <li className={classes.SideDrawerItem}>
                                <h2>
                                    <span className={classes.Hovered}
                                          onClick={this.props.logout}>
                                        <img src={logoutLogo} />
                                        <span className={classes.disappearOnSmallScreens}>
                                            Logout
                                        </span>
                                    </span>
                                </h2>
                            </li>
                        </ul>
                    </div>
                </div>

                <MobileNavigation
                    performLogout={this.props.logout}/>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => (
    {
        logout: () => dispatch(logout()),
    }
);

export default connect(null, mapDispatchToProps)(SideDrawer);