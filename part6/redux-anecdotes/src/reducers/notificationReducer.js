const initialState = null

const notificationReducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch(action.type){
      case 'NOTIFY':
        return action.notification
      case 'CLOSE_NOTIFICATION':
        return initialState
    }
    return state
  }
  
  export const showNotification = (notification) => {
      console.log('content in notifyCreatedBlog ', notification)
    return {
      type: 'NOTIFY',
      notification
    }
  }
  
  export const hideNotification = () => {
    return{
      type: 'CLOSE_NOTIFICATION',
      initialState
    }
  }

  export default notificationReducer