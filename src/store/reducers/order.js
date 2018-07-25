import * as aType from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  loadingAllOrders: false,
  allUserOrders: [],
  fetchOrdersError: null,
  purchaseBurgerError: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case aType.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case aType.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
      };
    case aType.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
        purchaseBurgerError: action.error
      };
    case aType.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };
    case aType.FETCH_ORDERS_START:
      return {
        ...state
        //   loadingAllOrders: false,
      };
    case aType.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        allUserOrders: action.orders,
        loadingAllOrders: true
      };
    case aType.FETCH_ORDERS_FAIL:
      return {
        ...state,
        fetchOrdersError: action.error,
        loadingAllOrders: true
      };
    default:
      return state;
  }
};

export default reducer;
