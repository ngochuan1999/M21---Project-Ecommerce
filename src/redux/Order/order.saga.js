import { takeLatest, put, all, call } from 'redux-saga/effects';
import { clearCart } from '../Cart/cart.action';
import { setOrderDetail, setUserOrderHistory ,getOrderDetail, getUserOrderHistory, setOrders, fetchOrders } from './order.action';
import { handleAddOrder, handleDeleteOrder, handleEditOrder, handleFetchOrders, handleGetOrder, handleGetUserOrderHistory } from './order.helper';
import orderTypes from './order.types';

// add order

export function* addOrder( {payload} ) {

    try {
        console.log(payload)
        yield handleAddOrder(
            payload
        );
        
    } catch (err) {
        // console.log(err);
    }

}

export function* onAddOrder() {
    yield takeLatest(orderTypes.ADD_TO_ORDER, addOrder);
}






export function* fetchListOrder({payload}) {
    try {
        const order = yield handleFetchOrders(payload);
        yield put(
            setOrders(order)
        )
        
    } catch (error) {
        
    }
}

export function* onFetchOrder() {
    yield takeLatest(orderTypes.FETCH_ORDERS, fetchListOrder)
}




export function* getUserOrder({payload}) {
    try {
        console.log("get order" , payload)
        console.log(payload)
        const history = yield handleGetUserOrderHistory(payload);
        console.log(history)
        yield put(
            setUserOrderHistory(history)
        )
        
    } catch (error) {
        
    }
}


export function* onGetUserOrderHistory() {
    yield takeLatest(orderTypes.GET_USER_ORDER_HISTORY, getUserOrder)
}

export function* getOrder({payload}) {
    try {
        const order = yield handleGetOrder(payload)
        yield put(
            setOrderDetail(order)
        )
        
    } catch (error) {
        
    }
}


export function* onGetOrderDetail() {
    yield takeLatest(orderTypes.GET_ORDER_DETAIL, getOrder )
}




export function* editOrder({payload, id}) {
    try {
        yield handleEditOrder(payload, id)
        
        yield put(
            getOrderDetail(id)
        )
    } catch (error) {
        
    }
}

export function* onEditOrder() {
    yield takeLatest(orderTypes.EDIT_ORDER, editOrder)
}


export function* deleteOrder({payload}) {
    try {
        yield handleDeleteOrder(payload);

        yield put(
            fetchOrders()
        )
    } catch (error) {
        
    }
}

export function* onDeleteOrder() {
    yield takeLatest(orderTypes.DELETE_ORDER,deleteOrder)
}


export default function* orderSagas() {
    yield all([
        call(onAddOrder),
        call(onGetUserOrderHistory),
        call(onGetOrderDetail),
        call(onEditOrder),
        call(onDeleteOrder),
        call(onFetchOrder)
    ])
}