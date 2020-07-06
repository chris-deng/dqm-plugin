/** dqm 列表概览页 */
import React from 'react'
import {  Tabs,Card, Row, Col, Table,Avatar,Button } from 'antd'
import { PieChartOutlined } from '@ant-design/icons'

// import Tabs, {TabPane} from 'rc-tabs'
// import 'rc-tabs/assets/index.css'

import { metricsData } from './mockData'
import { formatMetricDataByCategory, pluginDataColumns } from './widget'

// import './index.scss'

class DQMList extends React.Component {
  state = { metricsData: [], activeTabKey: '' }
  componentDidMount() {
    // 请求数据结构
    const category = formatMetricDataByCategory(metricsData)
    // console.log(category)
    // 默认显示第一个tab

    const firstTab = category[0] || {}
    this.tabChange(firstTab.category)

    this.setState({ metricsData: category })
  }
  getDqmMetricsData = async () => {
    const {} = this.state
  }

  // 跳转到详情页
  jumpToDetail = (pluginData) => {
    console.log(pluginData)
    console.log(this.props)
    const { root = {} } = this.props

    root.changeShowComp('detail')
    root.updateParams({ plugin_code: pluginData.name, plugin_name: pluginData.label })
    // this.props.
  }
  genTabPane = () => {
    const { metricsData } = this.state
    return metricsData.map((item) => {
      return (
        <Tabs.TabPane tab={item.category} key={item.category}>
        </Tabs.TabPane>
      )
    })
  }
  tabChange = activeKey => this.setState({activeTabKey: activeKey})

  genTabContent = ()=> {
    
    const {metricsData, activeTabKey} = this.state
    const targetCategoryData = metricsData.find(d=>d.category === activeTabKey) || {}
    const {plugin_items=[]} = targetCategoryData
    return this.genTabPaneContent(plugin_items)
  }
  genTabPaneContent = (plugin_set = []) => {
    // const res = plugin_set.map((item) => {})
    // 将数组分为每两个一组，表格两个一行, 可以几排
    const num = Math.ceil(plugin_set.length / 2)

    let numArr = []
    for (let index = 0;index<num;index++){
      numArr.push(index)
    }

    const tmp = numArr.map((index) => plugin_set.slice(index * 2, index * 2 + 2))

    return tmp.map((subArr, index) => {
      const first = subArr[0] || {}
      const plugin_code = first.plugin_code

      return (
        <div className='dqm-row needMarginButton' key={`${plugin_code}-${index}-row`}>
          {subArr.map((sub,index)=><div className='dqm-col dqm-col-12' key={`${sub.fitted_group_count}-${index}`}>
            {this.genPluginDataCard(sub)}
          </div>)}
        </div>
      )
    })
  }
  // 每两个一行
  genPluginDataCard = (data = {}) => {
    // 生成指标数据概览卡片
    const { overview = {}, detail = [] } = data
    return (
      <div className='dqm-card'>
        <div className="card-head">
          <div className="dqm-row card-head-row">

            <div className="header-left dqm-col dqm-col-12">
              <div className="icon">
                <span className="header-avatar">
                  <PieChartOutlined />
                </span>
              </div>

              <div className='header-txt'>
                <p className="plugin-name label" title={data.plugin_name || data.label}>{data.plugin_name || data.label}</p>
                <p className="plugin-num">{overview.source_total || overview.galaxyx_total}</p>
              </div>
            </div>

            <div className="header-right dqm-col-8">
              <div>
                <p className="label">未拟合</p>
                <p className="minus-num">{overview.minus}</p>
              </div>
            </div>

            <div className="header-plugin-detail dqm-col-4">
              <button className='button-link' onClick={()=>this.jumpToDetail(data)}>
                <span>查看详情</span>
              </button>
            </div>
          </div>
        </div>
        <Table
          columns={pluginDataColumns}
          dataSource={detail}
          pagination={false}
          rowKey="project"
          scroll={{ y: 250 }}
          style={{ height: 250 }}
          size="small"
          // bordereds
        />
      </div>
    )
  }
  render() {
    return (
      <div className="dqm-list">
        <Tabs onChange={this.tabChange} >
          {this.genTabPane()}
        </Tabs>
        <div className="dqm-tab-content">
          {this.genTabContent()}
        </div>
      </div>
    )
  }
}

export default DQMList
