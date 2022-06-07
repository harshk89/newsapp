import React, { Component } from 'react'
import loading from '../loading.gif'

export class Spinner extends Component {
  render() {
    return (
      <div style={{textAlign: "center", marginBottom: '10px'}}>
          <img src={loading} alt="loading"/>
      </div>
    )
    
  }
}

export default Spinner