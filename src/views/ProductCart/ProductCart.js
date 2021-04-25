import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { addToCart, removeCart } from '../../redux/Cart/cart.action';
import { selectCartItems } from '../../redux/Cart/cart.selectors';
import './style.css';
import swal from 'sweetalert';
import { formatter } from '../../App';
import Start from '../Start/Start';
const mapState = createStructuredSelector({
    cartItems: selectCartItems
});

function ProductCart(product) {
    const { cartItems } = useSelector(mapState)
    const dispatch = useDispatch()
    const history = useHistory()

    const { documentID, thumbnail, name, price, number } = product;


    console.log(product)

    const handleAddToCart = (product) => {
        if (!product) return;
        dispatch(addToCart(product));
        swal({
            button: false,
            text: "Sản phẩm đã được thêm vào giỏ hàng",
            icon: "success",
            timer: 1000
        });
        // history.push('/cart')

    }
    return (
        <>
            <div className="justyfy-content-center card p-1 m-5 col-lg-2 col-md-3 col-sm-3 col-12 text-decoration-none">
                <img className="img-fluid m-auto" src={thumbnail} alt="Card image" />
                <Link style={{ textDecoration: 'none' }} to={`/product/${documentID}`} className="detail_product">
                    <div className="detail">
                        <p id='text-card' className="card-text text-center font-weight-bold  ">{name}</p>
                    </div>
                </Link>
                <p className="text-center text-warning"><strong> {formatter.format(price)}</strong></p>
                <div className="d-flex justify-content-center">
                    {number == 0 ? <button className="btn btn-primary" disabled >Sold Out</button> : <button className="btn btn-secondary w-100 btn_cart" onClick={() => { handleAddToCart(product) }}><i class="fas fa-cart-plus"></i> Thêm vào giỏ hàng</button>}
                </div>
                {/* <div className="rating text-center p-3">
                    <span>
                        <Start product={product} id={documentID} />
                    </span>
                </div> */}
            </div>
        </>
    );
}

export default ProductCart;