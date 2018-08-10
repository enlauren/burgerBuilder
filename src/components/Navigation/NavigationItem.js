import React from "react";
import { NavLink } from "react-router-dom";

const NavigationItem = props => {
    return props.liClass /*  render the top menu if liClass is defined  */ ? (
        <li className={"menu-item " + props.liClass}>
            <NavLink
                exact={props.exact}
                to={props.link}
                className={props.aClass}
                activeClassName="active"
                onClick={props.openSideDrawer}
            >
                {props.children}
            </NavLink>
        </li>
    ) : (
        /*  navigation items in the sidebar   */
        <li className="menu-item">
            <NavLink exact={props.exact} to={props.link} activeClassName="active">
                {props.children}
            </NavLink>
        </li>
    );
};

export default NavigationItem;
