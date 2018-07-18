import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem';

const NavigationItems = (props) => {
    return (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact >Burger Builder</NavigationItem>
        {props.token ? <NavigationItem link="/orders">My Orders</NavigationItem> : null}
        {props.isAuth ? <NavigationItem link="/logout">Logout</NavigationItem> : <NavigationItem link="/auth">Authenticate</NavigationItem>}
    </ul>
    )
}


export default NavigationItems;