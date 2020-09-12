import React from "react";
import classes from './Logo.module.css';
import Logo from '../../assets/logo.png';


const logo = () => (
    <div className={classes.Logo}>
        <img src={Logo} />
    </div>
);

export default logo;