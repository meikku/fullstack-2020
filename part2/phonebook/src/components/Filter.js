import React from 'react'

const Filter = ( {handleQuery}) => {
  return (
    <div>
        <form>
          filter shown with <input query="text" onChange={handleQuery}>
          </input>
      </form>
    </div>
  )
}

export default Filter