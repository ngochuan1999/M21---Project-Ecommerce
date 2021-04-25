
import reviewTypes from './Review.type';

const INITIAL_STATE = {
    listReview: [],
    listReply : []
};

const reviewReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case reviewTypes.FETCH_REVIEW:
            return {
                ...state
            }
        case reviewTypes.SET_REVIEW:
            return {
                ...state,
                listReview: action.payload
            }


        case reviewTypes.FETCH_REPLY:
            return {
                ...state
            }
        case reviewTypes.SET_REPLY:
            return {
                ...state,
                listReply: action.payload
            }
        default:
            return state;
    }
};
export default reviewReducer;