import React from "react";
import classes from './Logo.module.css';
import Logo from '../../assets/logo.png';


const logo = (props) => (
    <div className={classes.Logo}>
        <img src={Logo} className={classes.srcOne}/>
    </div>
);

export default logo;