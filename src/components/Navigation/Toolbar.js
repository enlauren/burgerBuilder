import React from 'react';
import classes from './Toolbar.css'
import Logo from "../Logo";
import NavigationItems from "./NavigationItems";

const Toolbar =(props) => {
    return (
      <header className={classes.Toolbar}>
        <div className={classes.topMenu} onClick={props.openSideDrawer}>MENU</div>
        <div className={classes.Logo}>
        <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
          <NavigationItems token={props.token} isAuth={props.isAuth} />
        </nav>
      </header>
    )


}

export default Toolbar;