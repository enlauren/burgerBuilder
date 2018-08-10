import React from "react";

import NavigationItem from "./NavigationItem";

const NavigationItems = props => {
    return (
        <div className="side-wrapper">
            <ul className="header-side-top">
                <NavigationItem link="/" exact>
                    MY BURGER
                </NavigationItem>
                <NavigationItem link="/ourrecipes">BURGERS</NavigationItem>
                <NavigationItem link="/drinks">DRINKS</NavigationItem>
                {props.token ? <NavigationItem link="/account">MY ACCOUNT</NavigationItem> : null}
                {props.isAuth ? (
                    <NavigationItem link="/logout">LOGOUT</NavigationItem>
                ) : (
                    <NavigationItem link="/auth">MY ACCOUNT</NavigationItem>
                )}
            </ul>
            <ul className="header-side-bottom">
                <NavigationItem link="/ourchef">OUR CHEF</NavigationItem>
                <NavigationItem link="/aboutus">ABOUT US</NavigationItem>
            </ul>
        </div>
    );
};

export default NavigationItems;
