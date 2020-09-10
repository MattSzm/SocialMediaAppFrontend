import React from "react";
import classes from './Footer.module.css';


const Footer = () => {
    return (
        <footer className={classes.Footer}>
            <p>Check the repository on my
                <strong
                    onClick={()=>{window.open('https://github.com/MattSzm/SocialMediaAppFrontend',
                        '_blank');}}>
                    &nbsp; Github
                </strong>.</p>
            <p>© 2020 Mateusz Szmal. All Rights Reserved.</p>
        </footer>
    );
}

export default Footer;