import orderTypes from "./order.types";

const INITIAL_STATE = {
    orders: {
        
    },
    orderHistory: [],
    orderDetail : {},
    listOrder: []

    
}; 

const orderReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case orderTypes.ADD_TO_ORDER:
            return {
                ...state,
                orders: action.payload
            }
        case orderTypes.SET_ORDERS:
            return {
                ...state,
                listOrder : action.payload
            }


        case orderTypes.SET_USER_ORDER_HISTORY:
            return {
                ...state,
                orderHistory: action.payload
                
            }
        case orderTypes.SET_ORDER_DETAIL:
            return {
                ...state,
                orderDetail: action.payload
            }
            default:
                return state
 }

}


export default orderReducer

