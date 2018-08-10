import React from "react";
import ToolbarItems from "./ToolbarItems";

const Toolbar = props => {
    return (
        <div className="header top-menu">
            <ToolbarItems token={props.token} isAuth={props.isAuth} openSideDrawer={props.openSideDrawer} />
        </div>
    );
};

export default Toolbar;
