import React from "react";
import classes from './MobileNavigation.module.css';
import homeLogo from "../../assets/icons/home.png";
import exploreLogo from "../../assets/icons/explore.png";
import profileLogo from "../../assets/icons/profile.png";
import logoutLogo from "../../assets/icons/logout.png";
import {NavLink} from "react-router-dom";


const MobileNavigation = (props) => {

    return (
        <div className={classes.MobileNavigation}>
            <NavLink to="/" exact
                     className={classes.MobileNavigationItem}
                     activeClassName={classes.Active}>
                <img src={homeLogo} />
            </NavLink>

            <NavLink to="/explore" exact
                     className={classes.MobileNavigationItem}
                     activeClassName={classes.Active}>
                <img src={exploreLogo} />
            </NavLink>

            <NavLink to="/profile" exact
                     className={classes.MobileNavigationItem}
                     activeClassName={classes.Active}>
                <img src={profileLogo} />
            </NavLink>

            <div onClick={props.performLogout}
                className={classes.MobileNavigationItem}>
                <img src={logoutLogo} />
            </div>
        </div>
    );
}

export default MobileNavigation;