const initialState = null

const notificationReducer = (state = initialState, action) => {
    switch(action.type){
      case 'NOTIFY':
        return action.notification
      case 'CLOSE_NOTIFICATION':
        return initialState
    }
    return state
  }
  
  export const showNotification = (notification, time) => {
    return dispatch => {
      dispatch({
        type: 'NOTIFY',
        notification
      })
      setTimeout(() => {
        dispatch(hideNotification())
      }, 1000 * time)
    }
  }
  
  export const hideNotification = () => {
    return{
      type: 'CLOSE_NOTIFICATION',
    }
  }

  export default notificationReducer