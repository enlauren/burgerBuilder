import React, { Component } from "react";
import Auxi from "./Auxi";
import SimpleEntry from "../components/SimpleEntry";
import Toolbar from "../components/Navigation/Toolbar";
import SideDrawer from "../components/Navigation/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerOpenHandler = () => {
        this.setState({ showSideDrawer: true });
    };

    sideDrawerClosedHandler = () => {
        this.setState(prevState => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    };

    render() {
        return (
            <Auxi>
                <div className="inner-container">
                    <SimpleEntry />
                    <div className="container">
                        <SideDrawer
                            isAuth={this.props.isAuthenticated}
                            token={this.props.token}
                            closed={this.sideDrawerClosedHandler}
                            open={this.state.showSideDrawer}
                        />
                        <div className="right-col col-10">
                            <Toolbar
                                token={this.props.token}
                                isAuth={this.props.isAuthenticated}
                                openSideDrawer={this.sideDrawerOpenHandler}
                            />
                            <div className="header-pattern">
                                <div className="pattern" />
                            </div>
                            <div className="flex-column">{this.props.children}</div>
                        </div>
                    </div>
                </div>
            </Auxi>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(
    mapStateToProps,
    null
)(Layout);
