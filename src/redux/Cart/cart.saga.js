import { takeLatest, put, all, call } from 'redux-saga/effects';
import { firestore } from '../../firebase/ultils';
import { handleAddCart } from './cart.helper';
import cartTypes from './cart.types';


export function* addToCart({payload}) {
   
}

export function* onAddToCart() {
    yield takeLatest(cartTypes.ADD_TO_CART, addToCart);
}



export default function* cartSagas() {
    yield all([
       call(onAddToCart)
    ])
}