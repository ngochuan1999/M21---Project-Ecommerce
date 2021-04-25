import orderTypes from "./order.types";



export const addToOrder = (info) => ({
    type: orderTypes.ADD_TO_ORDER,
    payload: info
})


// orders [] 
export const fetchOrders = () => ({
    type : orderTypes.FETCH_ORDERS
})
export const setOrders = orders => ({
    type: orderTypes.SET_ORDERS,
    payload: orders
})


// orderHistory []
export const getUserOrderHistory = uid => ({
    type: orderTypes.GET_USER_ORDER_HISTORY,
    payload: uid
})
export const setUserOrderHistory = history => ({
    type: orderTypes.SET_USER_ORDER_HISTORY,
    payload: history
})



// orderDetail {}

export const getOrderDetail = orderID => ({
    type: orderTypes.GET_ORDER_DETAIL,
    payload: orderID
});
export const setOrderDetail = order => ({
    type: orderTypes.SET_ORDER_DETAIL,
    payload: order
})



// order action

export const deleteOrder = orderID => ({
    type: orderTypes.DELETE_ORDER,
    payload: orderID
})
export const editOrder = (orderData, id) => ({
    type: orderTypes.EDIT_ORDER,
    payload: orderData,
    id: id
})