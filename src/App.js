import React from 'react'
// import callApi, { initRequest } from './callApi'

// import { ConfigProvider } from 'antd'
// import zhCN from 'antd/es/locale/zh_CN'
import 'antd/dist/antd.css'

import './App.scss'

import RootContext, { getInitialRootContextValue } from './components/RootContext/RootContext'

import DQMList from './components/DQMList'
import DQMDetail from './components/DQMDetail'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = getInitialRootContextValue()
  }
  componentDidMount() {
    this.setState({ changeShowComp: this.changeShowComp, updateParams: this.updateParams })
  }
  changeShowComp = (compType) => {
    this.setState({ showComponent: compType })
  }
  updateParams = (params) => this.setState({ params: { ...this.state.params, ...params } })

  render() {
    const { showComponent } = this.state
    return (
      // <ConfigProvider locale={zhCN}>
        <div className="dqm-container">
          <RootContext.Provider value={this.state}>
            <RootContext.Consumer>
              {(root) => (
                <div>
                  {showComponent === 'list' && <DQMList root={root} {...this.props} />}
                  {showComponent === 'detail' && <DQMDetail root={root} {...this.props} />}
                </div>
              )}
            </RootContext.Consumer>
          </RootContext.Provider>
        </div>
      // </ConfigProvider>
    )
  }
}
