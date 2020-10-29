import React from 'react'

const Notification = ({ message, error }) => {
    if (message === null) {
      return null
    }
    if (error === true)
    {
      return (
        <div className="error">
        {message}
      </div>
      )
    }
    if (error === false)
    {
      return (
      
        <div className="info">
          {message}
        </div>
      )
    }
  }

  export default Notification