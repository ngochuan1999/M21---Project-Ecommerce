import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQtyItem, addToCart, reduceCartItem, removeCart, removeCartItem } from '../../redux/Cart/cart.action';
import { selectCartTotal } from '../../redux/Cart/cart.selectors';
import swal from 'sweetalert';
import { formatter } from '../../App';


const mapState = ({ productsData }) => ({
    products: productsData.products
})
function Item(props) {
    const { products } = useSelector(mapState)
    const dispatch = useDispatch();

    const addProduct = (product) => {
        dispatch(addToCart(product))
    }

    const reduceCart = (product) => {
        dispatch(reduceCartItem(product))
    }

    const removeCart = (documentID) => {

        swal({
            title: "Xóa sản phẩm khỏi giỏ hàng?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch(removeCartItem({ documentID }))
                }
            });
    }

    const { thumbnail, name, quantity, price } = props
    const supTotal = (price * quantity);
    console.log(props)
    return (
        <>
            {  quantity == 0 ? "" :
                <tr>
                    <th scope="row"><img className="img-thumbnail w-25" src={thumbnail} /></th>
                    <td>{name}</td>
                    <td> <div className="d-flex "> <button className="btn" onClick={() => reduceCart(props)} ><i class="fas fa-minus"></i></button>  <p className="m-2">{quantity}</p>  <button className="btn  " onClick={() => addProduct(props)}><i class="fas fa-plus"></i></button> </div> </td>
                    <td scope="col">{formatter.format(supTotal)}</td>
                    <td > <button className="btn btn-danger" onClick={() => removeCart(props.documentID)}><i class="fas fa-trash-alt"></i></button> </td>
                </tr>


            }


        </>
    );
}

export default Item;