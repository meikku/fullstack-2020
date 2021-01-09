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
  
  export const showNotification = (notification, time) => {
    return dispatch => {
      dispatch({
        type: 'NOTIFY',
        data: notification
      })
      setTimeout(() => {
        dispatch(hideNotification())
      }, 500 * time)
    }
  }
  
  export const hideNotification = () => {
    return{
      type: 'CLOSE_NOTIFICATION',
    }
  }

  export default notificationReducer