import React from "react";
import classes from './Layout.module.css';
import SideDrawer from "../../containers/SideDrawer/SideDrawer";
import Posts from "../../containers/Posts/Posts";
import Info from "../../containers/Info/Info";
import MobileNavigation from "../../components/MobileNavigation/MobileNavigation";


class Layout extends React.Component{


    render() {
        return(
            <React.Fragment>
                <div className={classes.Layout}>
                    <SideDrawer />

                    <Posts />

                    <Info />
                </div>

                <MobileNavigation />
            </React.Fragment>
        );
    }
}

export default Layout;