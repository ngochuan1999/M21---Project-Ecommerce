import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import OrderDetail from '../../Admin/Order/OrderDetail/OrderDetail';
import { formatter } from '../../App';
import useScrollTop from '../../hook/useScrollTop';
import { getOrderDetail } from '../../redux/Order/order.action';
const mapState = ({ orderData }) => ({
    orderDetail: orderData.orderDetail
})
function OrderDetailUser(props) {
    useScrollTop();
    const { orderDetail } = useSelector(mapState)
    const { id } = useParams()
    const dispatch = useDispatch()
    console.log(id)

    useEffect(() => {
        dispatch(
            getOrderDetail(id)
        )
    }, [])
    console.log(orderDetail)
    return (

        <div className="mt-5">
            <h2 className="text-center">Chi tiết đơn hàng</h2>
            <h2 className="text-center">Đơn hàng được đặt lúc :{orderDetail?.datePlaced?.split("T")[0]} </h2>
            <p className="text-center">Hình thức thanh toán : {orderDetail.shipping?.payment == "cod" ? "Thanh toán khi nhận hàng" : "Chuyển khoản"} </p>
            <div className="mt-5 row">

                <div className="col">
                    <OrderDetail item={orderDetail.item} />
                </div>

                <div className="col">
                    <h3> Tổng số tiền đơn hàng: {formatter.format(orderDetail.total)} </h3>
                    <h3>Trạng thái đơn hàng: {orderDetail.finish == "true" ? <p className='text-success'>Hoàn thành</p> : <p className='text-warning'>Đang xử lý</p>}</h3>
                    <strong>Địa chỉ và thông tin nhận hàng : </strong>
                    <ul className="list-unstyled">
                        <li>Địa Chỉ nhận hàng :  {orderDetail.shipping?.address}</li>
                        <li>Email :  {orderDetail.shipping?.email}</li>
                        <li>Tên :  {orderDetail.shipping?.name}</li>
                        <li>SĐT : {orderDetail.shipping?.phone}</li>
                    </ul>
                </div>


            </div>
        </div>


    );

}

export default OrderDetailUser;