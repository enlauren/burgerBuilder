import React from "react";
import Logo from '../../components/Logo'
import NavigationItems from "./NavigationItems";
import classes from './SideDrawer.css'
import BackDrop from '../BackDrop'
import Auxi from "../../hoc/Auxi";

const SideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open)  {
        attachedClasses=[classes.SideDrawer, classes.Open]
    }

  return (
      <Auxi>
      <BackDrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
          <div className={classes.Logo}>
          <Logo />
          </div>
          <nav>
              <NavigationItems token={props.token} isAuth={props.isAuth}/>  
          </nav>
      </div>
      </Auxi>
  );
}

export default SideDrawer;