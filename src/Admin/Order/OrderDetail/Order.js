import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editOrder, getOrderDetail } from '../../../redux/Order/order.action';
import OrderDetail from './OrderDetail';
import swal from 'sweetalert';
import { formatter } from '../../../App';
import useScrollTop from '../../../hook/useScrollTop';

const mapState = ({ orderData }) => ({
    orderDetail: orderData.orderDetail
})
function Order(props) {
    useScrollTop();
    const history = useHistory()
    const { orderID } = useParams();
    const dispatch = useDispatch();
    const { orderDetail } = useSelector(mapState)
    const [status, setStatus] = useState()

    console.log(orderDetail)

    useEffect(() => {
        setStatus(orderDetail.finish);

    }, [orderDetail])
    useEffect(() => {
        dispatch(
            getOrderDetail(orderID)
        )
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editOrder({
            ...orderDetail,
            finish: status
        }, orderDetail.documentID))
        swal("Cập nhật thành công!", "", "success");
        history.push('/admin/order')
    }
    return (
        <div className="text-center">
            <h2>Sản phẩm</h2>
            <OrderDetail item={orderDetail.item} />
            <h1> TỔNG TIỀN: {formatter.format(orderDetail.total)} đ</h1>
            <h2>Thông tin đơn hàng</h2>
            <ul className="list-unstyled">
                <li>Địa Chỉ :  {orderDetail.shipping?.address}</li>
                <li>Email :  {orderDetail.shipping?.email}</li>
                <li>Tên :  {orderDetail.shipping?.name}</li>
                <li>SĐT : {orderDetail.shipping?.phone}</li>
                <li>Hình thức thanh toán :  {orderDetail.shipping?.payment == "cod" ? "Thanh toán khi nhận hàng" : "Chuyển khoản"}</li>
            </ul>
            <form className='mb-3' onSubmit={handleSubmit}>


                <div className="form-group">
                    <label for="status">Trạng thái</label> <i></i>
                    <select className='' value={status} onChange={(e) => setStatus(e.target.value)}  >

                        <option className='text-warning' value="false">Đang xử lý</option>
                        <option className='text-success' value="true">Đã hoàn thành</option>
                    </select>
                </div>

                <button className="btn btn-success" type="submit">
                    Cập nhật đơn hàng
                    </button>

            </form>


        </div>
    );
}

export default Order;