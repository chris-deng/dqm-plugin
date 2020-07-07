import React, { Component } from 'react'
import { render } from 'react-dom'

import Example from '../../src'
import config from './config'

export default class Demo extends Component {
  render() {
    return (
      <div>
        <h1>dqm Demo</h1>
        <Example {...config} />
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
