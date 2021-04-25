import userTypes from "./user.type";

const INITIAL_STATE = {
    currentUser: null,
    userErr: [],
    users: [],
    user: {},
    loadingLogin: true
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case userTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                userErr: []
            }
        case userTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loadingLogin: false
            }

        case userTypes.SIGN_OUT_USER_SUCCESS:
            return {
                ...state,
                ...INITIAL_STATE
            }

        case userTypes.USER_ERROR:
            return {
                ...state,
                userErr: action.payload
            }
        case userTypes.SET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case userTypes.SET_USER:
            console.log("🚀 ~ file: user.reducer.js ~ line 42 ~ userReducer ~ user", action.payload)
            return {
                ...state,
                // user: action.payload,
                currentUser: action.payload
            }
            case userTypes.SET_USER_ADMIN:
                console.log("🚀 ~ file: user.reducer.js ~ line 42 ~ userReducer ~ user", action.payload)
                return {
                    ...state,
                    user: action.payload
                }
            
        default:
            return state;
    }
};


export default userReducer