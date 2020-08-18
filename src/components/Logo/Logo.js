import React from "react";
import classes from './Logo.module.css';
import Logo from '../../assets/Logo.png';
import LogoSmall from '../../assets/LogoSmall.png';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={Logo} className={classes.srcOne}/>
        <img src={LogoSmall} className={classes.srcTwo}/>
    </div>
);

export default logo;