import contactTypes from './contact.types'

export const addMessage = contactData => ({
    type: contactTypes.ADD_NEW_MESSAGE,
    payload: contactData
});

export const fetchMessage = () => ({
    type: contactTypes.FETCH_MESSAGE,

});
export const setMessage = message => ({
    type: contactTypes.SET_MESSAGE,
    payload: message
});
export const deleteMessage = messageId => ({
    type: contactTypes.DELETE_MESSAGE,
    payload: messageId
})
