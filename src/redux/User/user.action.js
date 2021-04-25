
import userTypes from './user.type'


export const emailSignInStart = userCredentials => ({
    type: userTypes.EMAIL_SIGN_IN_START,
    payload: userCredentials
});

export const loginSucces = () => ({
    type: userTypes.LOGIN_SUCCESS
})




export const signOutUserStart = () => ({
    type: userTypes.SIGN_OUT_USER_START
});

export const signOutUserSuccess = () => ({
    type: userTypes.SIGN_OUT_USER_SUCCESS
});

export const signUpUserStart = userCredentials => ({
    type: userTypes.SIGN_UP_USER_START,
    payload: userCredentials
});
export const userError = err => ({
    type: userTypes.USER_ERROR,
    payload: err
});


export const googleSignInStart = () => ({
    type: userTypes.GOOGLE_SIGN_IN_START
});




export const signInSuccess = user => ({
    type: userTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const checkUserSession = () => ({
    type: userTypes.CHECK_USER_SESSION
});
export const fetchUser = () => ({
    type: userTypes.FETCH_USER,

});
export const setUsers = users => ({
    type: userTypes.SET_USERS,
    payload: users
});
export const deleteUser = userId => ({
    type: userTypes.DELETE_USER,
    payload: userId
});
export const setUser = user => ({
    type: userTypes.SET_USER,
    payload: user
});
export const fetchUserId = userID => ({
    type: userTypes.FETCH_USER_ID,
    payload: userID,
});
export const editUser = (userData, id) => ({
    type: userTypes.EDIT_USER,
    payload: userData,
    id: id
});
export const addUser = userData => ({
    type: userTypes.ADD_NEW_USER,
    payload: userData
});






export const setUserAdmin = user => ({
    type: userTypes.SET_USER_ADMIN,
    payload: user
});
export const fetchUserAdmin = userID => ({
    type: userTypes.FETCH_USER_ADMIN,
    payload: userID,
});
export const editUserAdmin = (userData, id) => ({
    type: userTypes.EDIT_USER_ADMIN,
    payload: userData,
    id: id
});








