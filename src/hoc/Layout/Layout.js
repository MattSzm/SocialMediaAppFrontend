import React from "react";
import classes from './Layout.module.css';
import SideDrawer from "../../containers/SideDrawer/SideDrawer";
import Posts from "../../containers/Posts/Posts";
import Info from "../../containers/Info/Info";
import DrawerToggle from '../../components/DrawerToolbar/DrawerToggle'


class Layout extends React.Component{


    render() {
        return(
            <div className={classes.Layout}>
                <SideDrawer />
                <DrawerToggle display={true}/>

                <Posts />

                <DrawerToggle display={false}/>
                <Info />
            </div>
        );
    }
}

export default Layout;