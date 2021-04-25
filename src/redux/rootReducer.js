import { combineReducers } from "redux";
import cartReducer from "./Cart/cart.reducer";
import productsReducer from "./Product/products.reducer";
import userReducer from "./User/user.reducer";
import contactReducer from './Contact/contact.reducer'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import orderReducer from "./Order/order.reducer";
import reviewReducer from "./Review/Review.reducer";
import categoryReducer from "./Category/category.reducer";


export const rootReducer = combineReducers({
    user: userReducer,
    productsData: productsReducer,
    cartData: cartReducer,
    orderData: orderReducer,
    reviewData: reviewReducer,
    message: contactReducer,
    category: categoryReducer
})

const configStorage = {
    key: 'root',
    storage,
    whiteList: ['cartData']
}



export default persistReducer(configStorage, rootReducer)