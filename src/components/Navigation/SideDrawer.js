import React from "react";
import Logo from "../../components/Logo";
import NavigationItems from "./NavigationItems";
import BackDrop from "../BackDrop";
import Auxi from "../../hoc/Auxi";
import "./SideDrawer.css";
import { NavLink } from "react-router-dom";

const SideDrawer = props => {
    let attachedClasses = ["left-col col-2 ", "Close"];
    if (props.open) {
        attachedClasses = ["left-col col-2 ", "Open"];
    }

    return (
        <Auxi>
            <BackDrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(" ")} onClick={props.closed}>
                <ul className="header-icon">
                    <li className="burger-icon">
                        <NavLink exact to="/">
                            <span>REACT</span>
                            <Logo />
                        </NavLink>
                    </li>
                </ul>
                <NavigationItems token={props.token} isAuth={props.isAuth} />
            </div>
        </Auxi>
    );
};

export default SideDrawer;
