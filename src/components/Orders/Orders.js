import React, { Component } from "react";
import Order from "./Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler";
import { connect } from "react-redux";
// import { fetchOrdersInit } from '../../store/actions/order'; // or
import * as action from "../../store/actions/index";
import Spinner from "../../components/Navigation/Spinner";
import classes from "./Orders.css";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.user_id);
  }

  render() {
    let orders = <Spinner />;
    if (this.props.loading) {
      if (
        this.props.fetchOrdersError === undefined ||
        this.props.fetchOrdersError === null
      ) {
        orders = (
          <div>
            {this.props.orders.map(order => (
              <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}
              />
            ))}
          </div>
        );
      } else {
        orders = (
          <div className={classes.orders_error}>
            {this.props.fetchOrdersError}
          </div>
        );
      }
    }
    return orders;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, user_id) =>
      dispatch(action.fetchOrdersInit(token, user_id))
  };
};

const mapStateToProps = state => {
  return {
    orders: state.order.allUserOrders,
    loading: state.order.loadingAllOrders,
    fetchOrdersError: state.order.fetchOrdersError,
    token: state.auth.token,
    user_id: state.auth.userId
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
