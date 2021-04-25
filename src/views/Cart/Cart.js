import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { formatter } from '../../App';
import { firestore } from '../../firebase/ultils';
import { selectCartItems, selectCartItemsCount, selectCartTotal } from '../../redux/Cart/cart.selectors';
import ButtonCheckOut from '../CheckOut/ButtonCheckOut';
import Item from '../CheckOut/Item';


const mapState = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal,
});

const mapCart = (state) => ({
    user: state.user.currentUser,
    totalNumCartItems: selectCartItemsCount(state),
    products: state.products
})

function Cart(props) {
    const { cartItems, total } = useSelector(mapState);
    const { totalNumCartItems } = useSelector(mapCart);
    console.log(cartItems)
    console.log('tong gia', total)


    return (
        <>
            {
                cartItems.length > 0 ?
                    <div className="col-12 ">
                        <h3 className="bold">Giỏ Hàng của bạn </h3> <span>({totalNumCartItems} sản phẩm ) </span>
                        <div className="table-responsive container-fluid">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Hình ảnh</th>
                                        <th scope="col">Tên sản phẩm</th>
                                        <th scope="col">Số lượng</th>
                                        <th scope="col">Đơn giá</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                {cartItems.length > 0 ? <tbody>
                                    {cartItems.map((item) => (
                                        <Item {...item} />
                                    ))}

                                </tbody> : <p>Bạn không có sản phẩm nào trong giỏ hàng</p>}

                            </table>
                        </div>


                        <table>
                            <tr>
                                <td>
                                    <h3>Tổng Tiền : {formatter.format(total)} </h3>
                                </td>
                            </tr>
                        </table>
                    </div>

                    : <div className="text-center pt-5 mt-5 col-lg-12 col-12">
                        <h3 >Bạn chưa có sản phẩm nào trong giỏ hàng</h3>
                        <Link to="/"><button className="btn btn-primary">Tiếp tục mua hàng</button></Link>

                    </div>
            }

        </>
    );
}

export default Cart;