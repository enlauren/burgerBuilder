import * as aType from './actionTypes'
import axios from '../../axios-orders'


export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: aType.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (err) => {
    return {
        type: aType.PURCHASE_BURGER_FAIL,
        error: err
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: aType.PURCHASE_BURGER_START
    }
}


export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post("/orders.json?auth=" + token, orderData).then(response=>{
         //   console.log(response.data.name)
         //   console.log(orderData)
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))})
            .catch(error=>{dispatch(purchaseBurgerFail(error))});
    }
}

export const purchaseInit = () => {
    return {
        type: aType.PURCHASE_INIT
    }
}


// for the orders.js file 

export const fetchOrdersSuccess = (orders) => {
    return {
        type:aType.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}


export const fetchOrdersFail = (err) => {
    return {
        type:aType.FETCH_ORDERS_SUCCESS,
        error: err
    }
}

export const fetchOrdersStart = () => {
    return {
        type: aType.FETCH_ORDERS_START
    }

}

export const fetchOrdersInit  = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get('orders.json?auth=' + token)
        .then(res=> {
            const fetchOrders = [];
            for(let key in res.data)  {
                fetchOrders.push({
                ...res.data[key],
                id: key
                })
            }
            setTimeout(() =>{dispatch(fetchOrdersSuccess(fetchOrders))} , 2000);
        })
        .catch(err=>{
            dispatch(fetchOrdersFail(err))
        })
    }
    
}