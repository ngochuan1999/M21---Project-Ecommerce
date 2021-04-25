import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { formatter } from '../../../App';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deleteOrder, getUserOrderHistory, setUserOrderHistory } from '../../../redux/Order/order.action';
import swal from 'sweetalert';
import useScrollTop from '../../../hook/useScrollTop';
function OrderHistory({ orders, user }) {
    useScrollTop()
    console.log(orders)
    const history = useHistory()
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(
    //         getUserOrderHistory(user.id)
    //     )
    // },[] )

    console.log(orders)


    const handleDelete = (documentID) => {



    }
    return (

        <div className="">
            <h2>Danh sách đơn hàng </h2>
            <div class="table-responsive">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Tên khách hàng</th>
                                <th scope="col">Thời gian</th>
                                <th scope="col">Tổng tiền</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order, index) => {
                                    const { total, shipping, documentID, datePlaced, finish } = order
                                    console.log(datePlaced)
                                    return (
                                        <tr key={index}>
                                            <td> {index + 1} </td>
                                            <td><Link className='text-info' style={{ textDecoration: 'none' }} to={`/admin/order/${documentID}`}>{shipping?.name} </Link>   </td>
                                            <td>{datePlaced.split("T")[0]}</td>
                                            <td>{formatter.format(total)}</td>
                                            <td>{finish == "true" ? <p className='text-success font-weight-bold'>Hoàn thành</p> : <p className='font-weight-bold text-warning'> Đang xử lý </p>}</td>
                                            <td ><button onClick={() => swal({
                                                title: "Xóa sản đơn hàng?",
                                                icon: "warning",
                                                buttons: true,
                                                dangerMode: true,
                                            })
                                                .then((willDelete) => {
                                                    if (willDelete) {
                                                        dispatch(deleteOrder(documentID))
                                                    }
                                                })} className="btn btn-danger" >X</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default OrderHistory;