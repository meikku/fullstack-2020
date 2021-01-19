import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log('notification ', notification)
  if (notification === null) {
    return null
  }

  return (
    <div className="notification">
      {notification.message}
    </div>
  )
}

export default Notification