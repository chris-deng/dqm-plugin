import React from 'react'

export const getInitialRootContextValue = () => {
  return {
    ready: false, // 数据加载中
    // errorMessage:
    showComponent: 'list', // 默认显示列表概览
    changeShowComp: () => {},
    params: {}, // 共享的参数
    updateParams: () => {}, // 更新共享参数
  }
}

const RootContext = React.createContext(getInitialRootContextValue())

export default RootContext
