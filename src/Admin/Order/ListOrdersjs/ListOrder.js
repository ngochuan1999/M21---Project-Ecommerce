import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../../redux/Order/order.action';
import OrderHistory from '../OrderHistory/OrderHistory';


const mapState = ({orderData , user }) => ({
    orderHistory: orderData.orderHistory.data,
    user: user.currentUser,
    listOrder: orderData.listOrder
  })
function ListOrder(props) {
    const dispatch = useDispatch()
    const { orderHistory , user  ,listOrder} = useSelector(mapState)

    useEffect(() => {
        dispatch(
            fetchOrders()
        )
    }, [])
    console.log(listOrder)
    return (
        <>
            <OrderHistory user={user} orders={listOrder} />
        </>
    );
}

export default ListOrder;