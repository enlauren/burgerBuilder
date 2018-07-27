import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout";
import Orders from "./components/Orders/Orders";
import Auth from "./containers/Auth";
import Logout from "./containers/Logout";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CheckoutFinish from "./containers/CheckoutFInish";
import * as actions from "./store/actions/index";

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/refOrder" exact component={CheckoutFinish} />
                    {this.props.token ? (
                        <Route path="/orders" component={Orders} />
                    ) : (
                        <Route path="/auth" component={Auth} />
                    )}
                    <Route path="/logout" component={Logout} />
                    <Route path="/auth" component={Auth} />
                    <Route path="/" exact component={BurgerBuilder} />
                </Switch>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
