import { takeLatest, put, all, call } from 'redux-saga/effects';
import { auth } from './../../firebase/ultils'
import { fetchCategories, fetchCategory, setCategories, setCategory } from './category.action';
import { handleAddCategory, handleDeleteCategory, handleEditCategory, handleFetchCategories, handleFetchDetailCategory } from './category.helpers';
import categoryTypes from './category.types';

// add product

export function* addCategory({ payload }) {

    try {
        console.log('payload add category', payload)
        const timestamp = new Date();
        yield handleAddCategory({
            ...payload,
            CategoryAdminUserUID: auth.currentUser.uid,
            createdDate: timestamp
        });
        yield put(
            fetchCategories()
        );


    } catch (err) {
        // console.log(err);
    }

}

export function* onAddCategory() {
    yield takeLatest(categoryTypes.ADD_NEW_CATEGORY, addCategory);
}


// fetch all categories

export function* fetchListCategories({ payload }) {
    try {
        const product = yield handleFetchCategories(payload);
        yield put(
            setCategories(product)
        );

    } catch (err) {
        // console.log(err);
    }
}

export function* onFetchCategories() {
    yield takeLatest(categoryTypes.FETCH_CATEGORIES, fetchListCategories);
}






// fetch product
export function* fetchCategoryID({ payload }) {
    try {
        const categoryEdit = yield handleFetchDetailCategory(payload);
        yield put(
            setCategory(categoryEdit)
        );
    } catch (error) {

    }
}
export function* onFetchCategoryId() {
    yield takeLatest(categoryTypes.FETCH_CATEGORY, fetchCategoryID)
}


// delete product
export function* deleteCategory({ payload }) {
    try {
        yield handleDeleteCategory(payload);
        yield put(
            fetchCategories()
        )

    } catch (error) {

    }
}

export function* onDeleteCategory() {
    yield takeLatest(categoryTypes.DELETE_CATEGORY, deleteCategory)
}


export function* editCategory({ payload, id }) {
    try {

        console.log('payload edit product', payload)
        console.log('id edit product', id)
        yield handleEditCategory(payload, id);

        yield put(
            fetchCategory(id)
        )
    }
    catch (err) {

    }

}


export function* onEditCategory() {
    yield takeLatest(categoryTypes.EDIT_CATEGORY, editCategory)

}


export default function* categoriesSagas() {
    yield all([
        call(onAddCategory),
        call(onFetchCategories),
        call(onDeleteCategory),
        call(onFetchCategoryId),
        call(onEditCategory)
    ])
}