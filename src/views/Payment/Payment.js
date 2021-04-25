import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import CheckOut from '../CheckOut/CheckOut';
import { Formik, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addToOrder } from '../../redux/Order/order.action';
import { firestore } from '../../firebase/ultils';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartTotal } from '../../redux/Cart/cart.selectors';
import { clearCart } from '../../redux/Cart/cart.action';
import useScrollTop from '../../hook/useScrollTop';
import swal from 'sweetalert';
import { useHistory } from 'react-router';
import { fetchUserId } from '../../redux/User/user.saga';
import { Link } from 'react-router-dom';

const validate = values => {

    const errors = {};

    if (!values.name) {
        errors.name = 'Vui lòng nhập Họ Tên';
    }


    if (!values.phone) {
        errors.phone = 'Vui lòng nhập Số điện thoại';
    } else if (values.phone.length < 10) {
        errors.phone = 'Số điện thoại không đúng';
    }

    if (!values.address) {
        errors.address = 'Vui lòng nhập địa chỉ nhận hàng';
    }

    if (!values.email) {
        errors.email = 'Vui lòng nhập địa chỉ Email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Địa chỉ email không hợp lệ';
    }

    if (!values.payment) {
        errors.payment = 'Vui lòng chọn phương thức giao hàng';
    }

    return errors;
};


const mapState = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal,
});

const mapProduct = ({ productsData }) => ({
    products: productsData.products
})

const mapUser = ({ user }) => ({
    user: user.currentUser
})
function Payment(props) {
    useScrollTop();
    const { user } = useSelector(mapUser)
    const history = useHistory()
    console.log(user)

    const { cartItems, total } = useSelector(mapState)
    const { products } = useSelector(mapProduct)

    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);



    cartItems.map((e) => { console.log(e.documentID) })



    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            address: '',
            phone: '',
            payment: ''
        },
        validate,
        onSubmit: values => {
            const timestamp = new Date().toISOString();
            const data = {
                item: cartItems,
                shipping: values,
                datePlaced: timestamp,
                userID: user.id,
                finish: "false",
                total: total
            }
            dispatch(
                addToOrder(data)
            )
            dispatch(
                clearCart()
            )
            formik.resetForm();
            swal("Đặt Hàng Thành Công");
            // history.push('/');

        },
    });


    return (
        <>
            {
                cartItems.length > 0 ? <div className="row mt-5">
                    <div className="col-lg-6 col-12">
                        <h2 className="text-center">Thông tin giao hàng</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Họ và Tên</label>
                                <input class="form-control" id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Họ và Tên"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name} />
                                {formik.touched.name && formik.errors.name ? (
                                    <div>{formik.errors.name}</div>) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input class="form-control" id="email"
                                    name="email"
                                    type="text"
                                    placeholder="Email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email} />
                                {formik.touched.email && formik.errors.email ? (
                                    <div>{formik.errors.email}</div>) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Số điện thoại</label>
                                <input class="form-control" id="phone"
                                    name="phone"
                                    type="text"
                                    placeholder="Phone"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone} />
                                {formik.touched.phone && formik.errors.phone ? (
                                    <div>{formik.errors.phone}</div>) : null}
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Địa Chỉ</label>
                                <input class="form-control" id="address"
                                    name="address"
                                    type="text"
                                    placeholder="Địa Chỉ"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address} />
                                {formik.touched.address && formik.errors.address ? (
                                    <div>{formik.errors.address}</div>) : null}
                            </div>

                            <div className="form-group ">
                                <label htmlFor="start">Chọn hình thức thanh toán</label>
                                <select
                                    className="form-control w-25"
                                    name="payment"
                                    value={formik.values.payment}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={{ display: 'block' }}
                                >
                                    <option>Chọn</option>
                                    <option value="cod" >Thanh toán khi nhận hàng</option>
                                    <option value="bank">Chuyển khoản</option>

                                </select>
                                {formik.touched.payment && formik.errors.payment ? (
                                    <div>{formik.errors.payment}</div>) : null}

                                <div>
                                    {
                                        formik.values.payment == "bank" ?
                                            <div className="border p-5">
                                                <h2>Chủ Tài khoản : Võ Ngọc Huân</h2>
                                                <p> STK  : 1234566732 </p>
                                                <p>Ngân hàng Vietcombank - Chi nhánh Liên Chiểu Đà Nẵng</p>
                                            </div> : ""
                                    }

                                </div>
                            </div>

                            <button type="submit" className="btn btn-success mb-3">Hoàn Tất Đơn Hàng</button>



                        </form>
                    </div>
                    <div className="col-lg-6 col-12">
                        <Cart />
                    </div>
                </div> : <div className="text-center m-5 pt-5 ">
                    <h3 >Bạn chưa có sản phẩm nào trong giỏ hàng</h3>
                    <Link to="/"><button className="btn btn-primary">Tiếp tục mua hàng</button></Link>

                </div>
            }
        </>




    );
}

export default Payment;