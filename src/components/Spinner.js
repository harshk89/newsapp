import React from 'react'
import loading from '../loading.gif'

const Spinner = ()=> {
    return (
      <div style={{textAlign: "center", marginBottom: '10px'}}>
          <img src={loading} alt="loading"/>
      </div>
    )
}

export default Spinner