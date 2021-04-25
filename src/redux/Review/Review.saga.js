import { all, call, put, take, takeLatest } from "redux-saga/effects";
import { fetchReply, fetchReviews, setReply, setReviews } from "./Review.action";
import { handleAddReply, handleAddReview , handleFetchReviews } from "./Review.helper";
import reviewTypes from "./Review.type";

export function* addReview({ payload ,id }) {

    try {
        console.log('payload add product' , payload)
        yield handleAddReview(payload ,id );
        yield put(
            fetchReviews(id)
        )
       
    } catch (err) {
        // console.log(err);
    }
}

export function* onAddReview() {
    yield takeLatest(reviewTypes.ADD_REVIEW,addReview);
}


export function* fetchListReview({payload}) {
    try {
        console.log(payload)
        const reviews = yield handleFetchReviews(payload);
        
        yield put(
            setReviews(reviews)
        );
    } catch (error) {
        
    }
}



export function* onFetchReview() {
    yield takeLatest(reviewTypes.FETCH_REVIEW, fetchListReview)
}


export function* deleteReviewUser({payload}) {
    try {
        console.log(payload)
        
    } catch (error) {
        
    }
}

export function* onDeleteReview() {
    yield takeLatest(reviewTypes.DELETE_REVIEW, deleteReviewUser)
}







// Reply

export function* replyComment({ payload ,id  }) {
    try {
        console.log('payload add product')
        console.log('payload add product' , payload)
        console.log('payload add product' , id)
        yield handleAddReply(payload ,id );
        yield put(
            fetchReply(id)
        )
       
    } catch (err) {
        // console.log(err);
    }
}

export function* onAddReply() {
    yield takeLatest(reviewTypes.ADD_REPLY,replyComment);
}


export function* fetchListReply({payload}) {
    try {
        console.log(payload)
        const reply = yield handleFetchReviews(payload);
        console.log(reply)
        yield put(
            setReply(reply)
        );
    } catch (error) {
        
    }
}



export function* onFetchReply() {
    yield takeLatest(reviewTypes.FETCH_REPLY, fetchListReply)
}







export default function* reviewSagas() {
    yield all([
        call(onAddReview),
        call(onFetchReview),
        call(onDeleteReview),
        call(onAddReply),
        call(onFetchReply)
    ])
}