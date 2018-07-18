import React, { Component } from 'react'
import  Order  from './Order';
import axios from '../../axios-orders'
import withErrorHandler from "../../hoc/withErrorHandler"
import { connect } from 'react-redux'
// import { fetchOrdersInit } from '../../store/actions/order'; // or 
import * as action from '../../store/actions/index'
import Spinner from '../../components/Navigation/Spinner';


class Orders extends Component {


  componentDidMount() {
    this.props.onFetchOrders(this.props.token)
  }


  render() {

    let orders = <Spinner />;
    if(this.props.loading) {
      orders=(
        <div>
          {this.props.orders.map(order => (
            <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
          ))}
        </div>
      )
    }
    return orders;
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (y) => dispatch(action.fetchOrdersInit(y))
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.allUserOrders,
    loading: state.order.loadingAllOrders,
    token: state.auth.token
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));