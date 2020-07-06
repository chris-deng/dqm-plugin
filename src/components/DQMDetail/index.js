/** 详情 */
import React from 'react'
import { withRoot } from '../RootContext'
import { Table } from 'antd'
import PageOption from '../Pagination'

import { metricsDetailDataByPluginName } from './mockData'
import { pluginDataColumns, formatDetailData } from './widget'

class DQMDetail extends React.Component {
  state = { dataSource: [], searchData: {}, pageData: { _num: 20, _page: 1, total: 0 } }
  componentDidMount() {
    console.log(this.props)
    this.getDataSourceByPluginName()
  }
  // 详情里，根据插件名称请求对应数据
  getDataSourceByPluginName = async () => {
    // 请求
    const { searchData = {}, pageData = {} } = this.state
    const reqData = { ...searchData, _num: pageData._num, _page: pageData._page }
    console.log(reqData)

    const data = formatDetailData(metricsDetailDataByPluginName) || {}
    const { dataSource = [] } = data
    console.log(data)
    this.setState({ dataSource, pageData: { ...this.state.pageData, total: data.project_total } })
  }
  updatePageData = (page) =>
    this.setState({ pageData: { ...this.state.pageData, ...page } }, () =>
      this.getDataSourceByPluginName()
    )
  render() {
    const { root = {} } = this.props
    const { params = {} } = root
    return (
      <React.Fragment>
        <p>指标名称:{params.plugin_name}</p>
        <PageOption
          pageData={this.state.pageData}
          style={{ margin: '10px 0', textAlign: 'right' }}
        />
        <Table
          columns={this.gencolumns()}
          dataSource={this.state.dataSource}
          pagination={false}
          rowKey="id"
          style={{ border: '1px solid #e6e8eb' }}
        />
      </React.Fragment>
    )
  }
  gencolumns = () => {
    return pluginDataColumns.concat({
      title: '操作',
      dataIndex: 'op',
      render: (record) => {
        return <button className='button-link' onClick={()=>{}}>
                    <span>查看趋势</span>
                  </button>
      },
    })
  }
}

export default withRoot(DQMDetail)
