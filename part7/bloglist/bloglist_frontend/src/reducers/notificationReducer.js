const initialState = null

const notificationReducer = (state = initialState, action) => {
    switch(action.type){
        case 'NOTIFY':
            return action.data
        case 'CLOSE_NOTIFICATION':
            return initialState
    }
    return state
}

let timeoutID 

export const showNotification = (notification, time) => {

    if (timeoutID !== null) {
        clearTimeout(timeoutID) }
        return dispatch => {
            dispatch({
                type: 'NOTIFY',
                data: notification
            })
        timeoutID = setTimeout(() => {
            dispatch(hideNotification())
        }, 500 * time)
    }
}

export const hideNotification = () => {
    return{
        type: 'CLOSE_NOTIFICATION',
        initialState
    }
}

export default notificationReducer