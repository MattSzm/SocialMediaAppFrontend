import React from "react";
import classes from './DrawerToggle.module.css'

const drawerToggle = (props) => {
    if (props.display){
    return (<div
        // onClick={props.clicked}
        className={classes.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>);}
    else {
        return (<div className={classes.DrawerToggleDisabled}></div>);
    }

};
export default drawerToggle;