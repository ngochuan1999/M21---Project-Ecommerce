import { all, call } from 'redux-saga/effects'
import productsSagas from './Product/products.sagas'
import contactSagas from './Contact/contact.saga'
import orderSagas from './Order/order.saga'
import cartSagas from './Cart/cart.saga'
import userSagas from './User/user.saga'
import reviewSagas from './Review/Review.saga'
import categoriesSagas from './Category/category.sagas'


export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(productsSagas),
    call(cartSagas),
    call(orderSagas),
    call(reviewSagas),
    call(contactSagas),
    call(categoriesSagas)
  ])
}