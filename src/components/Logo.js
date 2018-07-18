import React from 'react'
import burgerlogo from '../assets/burger-logo.png'
import classes from "./Logo.css";


const Logo = (props) => (
  <div className={classes.Logo}>
      <img src={burgerlogo} alt="myBurger" />
  </div>
);


export default Logo;