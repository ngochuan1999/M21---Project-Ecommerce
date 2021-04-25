import { takeLatest, put, all, call } from 'redux-saga/effects';
import { fetchMessage, setMessage } from './contact.action';
import { handleAddMessage, handleFetchMessage, handleDeleteMessage } from './contact.helpers';
import contactTypes from './contact.types'
import { auth } from './../../firebase/ultils'

export function* fetchMessageSaga({ payload }) {
    try {
        const message = yield handleFetchMessage(payload);

        yield put(
            setMessage(message)
        );

    } catch (err) {
        // console.log(err);
    }
}

export function* onFetchMessage() {
    yield takeLatest(contactTypes.FETCH_MESSAGE, fetchMessageSaga);
}

export function* addMessageSaga({ payload }) {

    try {
        console.log('payload add product', payload)
        const timestamp = new Date();
        yield handleAddMessage({
            ...payload,
            MessageUserUID: auth.currentUser.uid,
            createdDate: timestamp
        });
        yield put(
            fetchMessage()
        );


    } catch (err) {
        // console.log(err);
    }

}
export function* onAddMessage() {
    yield takeLatest(contactTypes.ADD_NEW_MESSAGE, addMessageSaga);
}

export function* deleteMessageSaga({ payload }) {
    try {
        yield handleDeleteMessage(payload);
        yield put(
            fetchMessage()
        )

    } catch (error) {

    }
}

export function* onDeleteMessage() {
    yield takeLatest(contactTypes.DELETE_MESSAGE, deleteMessageSaga)
}

export default function* contactSagas() {
    yield all([
        call(onAddMessage),
        call(onFetchMessage),
        call(onDeleteMessage),

    ])
}