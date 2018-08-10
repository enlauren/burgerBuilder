import React, { Component } from "react";

import NavigationItem from "./NavigationItem";

class ToolbarItems extends Component {
    state = {
        elementMenuHover: { display: "none" }
    };

    showElHandler = () => {
        let temp = {
            width: "160px",
            backgroundColor: "#cec6d6",
            color: "#fff",
            textAlign: "center",
            padding: "5px 0",
            borderRadius: "6px",
            position: "absolute",
            zIndex: 1,
            marginTop: "-34px",
            marginLeft: "-120px",
            whiteSpace: "nowrap"
        };
        this.setState({ elementMenuHover: temp });
        console.log("show");
    };

    hideElHandler = () => {
        let temp = {
            display: "none"
        };
        this.setState({ elementMenuHover: temp });
    };
    render() {
        const addRelative = {
            position: "relative",
            display: "inline-block"
        };

        return (
            <ul>
                <NavigationItem
                    link=""
                    liClass="notifications"
                    aClass="menu-text"
                    openSideDrawer={this.props.openSideDrawer}
                >
                    <i className="fas fa-bars" />
                    <span>MENU</span>
                </NavigationItem>
                {this.props.token ? (
                    <NavigationItem link="/mydiscounts" liClass="notifications" aClass="menu-text">
                        <i className="fas fa-bell" />
                        <span>MY DISCOUNTS</span>
                    </NavigationItem>
                ) : (
                    <NavigationItem link="/auth" liClass="notifications" style={addRelative} aClass="menu-text">
                        <i className="fas fa-bell" />
                        <span onMouseEnter={this.showElHandler} onMouseLeave={this.hideElHandler}>
                            MY DISCOUNTS
                        </span>
                        <span style={this.state.elementMenuHover}>Great Discounts</span>
                    </NavigationItem>
                )}

                {this.props.token ? (
                    <NavigationItem link="/account" liClass="account" aClass="menu-text">
                        <i className="fas fa-user" />
                        <span>MY ACCOUNT</span>
                    </NavigationItem>
                ) : (
                    <NavigationItem link="/auth" liClass="account" aClass="menu-text">
                        <i className="fas fa-user" />
                        <span>MY ACCOUNT</span>
                    </NavigationItem>
                )}
                {this.props.token ? (
                    <NavigationItem link="/logout" liClass="account" aClass="menu-text">
                        <i class="fas fa-sign-out-alt" />
                        <span>MY ACCOUNT</span>
                    </NavigationItem>
                ) : null}
            </ul>
        );
    }
}

export default ToolbarItems;
