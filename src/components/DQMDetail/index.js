/** 详情 */
import React from 'react'
import { withRoot } from '../RootContext'
import { Table } from 'antd'
import PageOption from '../Pagination'

// import { metricsDetailDataByPluginName } from './mockData'
import { pluginDataColumns, formatDetailData } from './widget'
import { getMetricsOverviewData } from '../../callApi'

class DQMDetail extends React.Component {
  state = {
    dataSource: [],
    searchData: {},
    pageData: { _num: 20, _page: 1, total: 0 },
    detailLoading: false,
  }

  componentDidMount() {
    console.log(this.props)
    this.getDataSourceByPluginName()
  }

  // 详情里，根据插件名称请求对应数据
  getDataSourceByPluginName = async () => {
    // 请求
    const { root = {}, project_code } = this.props
    const auth_data = this.props.auth_data || {}
    const params = root.params || {}

    this.setState({ detailLoading: true })
    // const { searchData = {}, pageData = {} } = this.state
    // const reqData = { ...searchData, _num: pageData._num, _page: pageData._page }
    // console.log(reqData)

    const reqData = { plugin_code: params.plugin_code, app_code: project_code }
    console.log(reqData)

    const res = (await getMetricsOverviewData(auth_data, reqData)) || {}
    const { items = [] } = res
    const plugin_data = items[0] || {}
    // console.log(res)
    // const detail

    const data = formatDetailData(plugin_data) || {}
    const { dataSource = [] } = data
    // console.log(data)

    this.setState({
      dataSource,
      pageData: { ...this.state.pageData, total: data.total },
      detailLoading: false,
    })
  }

  updatePageData = (page) => {
    console.log(page)
    this.setState({ pageData: { ...this.state.pageData, ...page } }, () =>
      this.getDataSourceByPluginName()
    )
  }
  backToOverview = () => {
    const { root = {} } = this.props

    root.changeShowComp('list')
    root.updateParams({
      plugin_code: '',
      plugin_name: '',
      // dimension:
    })
  }

  render() {
    const { root = {} } = this.props
    const { params = {} } = root
    return (
      <div className="dqm-detail-container">
        <p>
          <button className="button-link" onClick={this.backToOverview}>
            返回概览
          </button>
        </p>
        <p>指标名称:{params.plugin_name}</p>
        <PageOption
          pageData={this.state.pageData}
          style={{ margin: '10px 0', textAlign: 'right' }}
          updatePageData={this.updatePageData}
        />
        <Table
          columns={this.gencolumns()}
          dataSource={this.state.dataSource}
          pagination={false}
          rowKey="project"
          size="small"
          style={{ border: '1px solid #e6e8eb' }}
          loading={this.state.detailLoading}
        />
      </div>
    )
  }
  gencolumns = () => {
    return pluginDataColumns.concat({
      title: '操作',
      dataIndex: 'op',
      render: (record) => {
        return (
          <button className="button-link" onClick={() => {}}>
            <span>查看趋势</span>
          </button>
        )
      },
    })
  }
}

export default withRoot(DQMDetail)
