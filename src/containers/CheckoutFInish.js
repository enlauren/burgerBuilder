import React, { Component } from "react";
import classes from "./ContactData.css";
import axios from "../axios-orders";
import { connect } from "react-redux";
import withErrorHandler from "../hoc/withErrorHandler";
import * as actions from "../store/actions/index";

class CheckoutFinish extends Component {
  componentDidMount = () => {
    const obj = {
      ingredients: this.props.ings,
      price: this.props.price
    };
    this.props.onOrderBurger(obj, this.props.token, this.props.user_id);
  };

  render() {
    return (
      <div className={classes.checkout_finnish}>
        <h4>Order has been sent.</h4>
        <h4>Approximate time of delivery: 40min</h4>
      </div>
    );
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
