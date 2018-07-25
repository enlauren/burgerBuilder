import React, { Component } from "react";
import classes from "./CheckoutFinish.css";
import axios from "../axios-orders";
import { connect } from "react-redux";
import withErrorHandler from "../hoc/withErrorHandler";
import * as actions from "../store/actions/index";
import Burger from "../components/Burger";
import { Redirect } from "react-router-dom";

class CheckoutFinish extends Component {
  componentDidMount = () => {
    if (this.props.ings && this.props.user_id) {
      const obj = {
        ingredients: this.props.ings,
        price: this.props.price
      };
      this.props.onOrderBurger(obj, this.props.token, this.props.user_id);
    }
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings && this.props.user_id) {
      summary = (
        <div className={classes.checkout_finnish}>
          <h4>Your order has been placed.</h4>
          <h4>Approximate time of delivery: 40min</h4>
          <div style={{ width: "300px", margin: "auto" }}>
            <Burger ingredients={this.props.ings} />
          </div>
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    user_id: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (obj, token, user_id) =>
      dispatch(actions.purchaseBurger(obj, token, user_id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(CheckoutFinish, axios));
