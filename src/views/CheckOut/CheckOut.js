import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import useScrollTop from '../../hook/useScrollTop';
import { selectCartItems } from '../../redux/Cart/cart.selectors';
import Cart from '../Cart/Cart';
import ButtonCheckOut from './ButtonCheckOut';
import Item from './Item';



const mapState = createStructuredSelector({
    cartItems: selectCartItems
});
function CheckOut(props) {
    const { cartItems } = useSelector(mapState);
    useScrollTop();
    return (
        <div className="row mt-5 pt-5 mb-5">
            <Cart />
            { cartItems.length > 0 ? <ButtonCheckOut /> : ""  }
            
        </div>
    );
}

export default CheckOut;