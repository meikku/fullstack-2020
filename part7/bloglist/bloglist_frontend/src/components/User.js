import React from 'react'
import { useSelector } from 'react-redux'

const User = () => {
  const user = useSelector(state => state.user)
  if (user === null) {
    return null
  }

  return (
    <div>
      <p>{user.id} {user.name} {user.username} {user.blogs}</p>
    </div>
  )
}

export default User