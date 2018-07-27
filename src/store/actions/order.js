import * as aType from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: aType.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = err => {
    return {
        type: aType.PURCHASE_BURGER_FAIL,
        error: err
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: aType.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (obj, token, user_id) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        obj["delivered"] = false;
        axios
            .post("orders/" + user_id + "/orders.json?auth=" + token, obj)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, obj));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: aType.PURCHASE_INIT
    };
};

// for the orders.js file

export const fetchOrdersSuccess = orders => {
    return {
        type: aType.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = err => {
    return {
        type: aType.FETCH_ORDERS_FAIL,
        error: err
    };
};

export const fetchOrdersStart = () => {
    return {
        type: aType.FETCH_ORDERS_START
    };
};

export const fetchOrdersInit = (token, user_id) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios
            .get("orders/" + user_id + "/orders.json?auth=" + token)
            .then(res => {
                if (!res.data) {
                    setTimeout(() => {
                        dispatch(
                            fetchOrdersFail(
                                "There are no orders in you history."
                            )
                        );
                    }, 1000);
                } else {
                    const fetchOrders = [];
                    for (let key in res.data) {
                        fetchOrders.push({
                            ...res.data[key],
                            id: key
                        });
                    }
                    setTimeout(() => {
                        dispatch(fetchOrdersSuccess(fetchOrders));
                    }, 1000);
                }
            })
            .catch(err => {
                setTimeout(() => {
                    dispatch(
                        fetchOrdersFail(
                            "There was a problem retrieving your order history."
                        )
                    );
                }, 1000);
            });
    };
};
