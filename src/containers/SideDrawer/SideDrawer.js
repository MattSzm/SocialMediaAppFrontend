import React from "react";
import classes from './SideDrawer.module.css';
import Logo from "../../components/Logo/Logo";


class SideDrawer extends React.Component{


    render() {
        return (
            <div className={classes.SIdeDrawerContainter}>
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
                            <h2><span>Logout</span></h2></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default SideDrawer;