/** dqm 列表概览页 */
import React from 'react'
import { Tabs, Card, Row, Col, Table,Avatar,Button } from 'antd'
import { PieChartOutlined } from '@ant-design/icons'

// import Table from 'rc-table'
// import 'rc-table/assets/index.css'



import { metricsData } from './mockData'
import { formatMetricDataByCategory, pluginDataColumns } from './widget'

// import './index.scss'

class DQMList extends React.Component {
  state = { metricsData: [] }
  componentDidMount() {
    // 请求数据结构
    const category = formatMetricDataByCategory(metricsData)
    console.log(category)

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
      const { plugin_items = [] } = item
      // const first = plugin_items[0] || {}
      return (
        <Tabs.TabPane tab={item.category} key={item.category}>
          {/* {this.genPluginDataCard(first)} */}
          {this.genTabPaneContent(plugin_items)}
        </Tabs.TabPane>
      )
    })
  }
  genTabPaneContent = (plugin_set = []) => {
    // const res = plugin_set.map((item) => {})
    // 将数组分为每两个一组，表格两个一行, 可以几排
    console.log('插件数据' + plugin_set)
    console.log(plugin_set)
    const num = Math.ceil(plugin_set.length / 2)
    // console.log(num)
    // const numArr = [...Array(num).keys()]
    let numArr = []
    for (let index = 0;index<num;index++){
      numArr.push(index)
    }
    console.log(numArr)

    const tmp = numArr.map((index) => plugin_set.slice(index * 2, index * 2 + 2))
    console.log('1111111')
    console.log(tmp)
    console.log(222222)
    return tmp.map((subArr, index) => {
      const first = subArr[0] || {}
      const plugin_code = first.plugin_code

      return (
        // <Row gutter={20} key={`${plugin_code}-${index}-row`} className="plugin-card-row">
        //   {subArr.map((sub, index) => (
        //     <Col span={12} key={`${sub.fitted_group_count}-${index}`}>
        //       {this.genPluginDataCard(sub)}
        //     </Col>
        //   ))}
        // </Row>
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
                <p className="plugin-name label">{data.plugin_name || data.label}</p>
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
          

            {/* <Row gutter={20}>
              <Col span={12} className="header-left">
                <div className="icon">
                  <span className='header-avatar'>
                  <PieChartOutlined />
                  </span>
                </div>
                <div className="header-txt">
                  <p className="plugin-name label">{data.plugin_name || data.label}</p>
                  <p className="plugin-num">{overview.source_total || overview.galaxyx_total}</p>
                </div>
              </Col>
              <Col span={8} className="header-right">
                <div>
                  <p className="label">未拟合</p>
                  <p className="minus-num">{overview.minus}</p>
                </div>
              </Col>
              <Col span={4}>
                <div className="plugin-detail">
                  <button className='button-link' onClick={()=>this.jumpToDetail(data)}>
                    <span>查看详情</span>
                  </button>
                </div>
              </Col>
            </Row> */}
          {/* </div> */}
        </div>
        {/* <Table
          columns={pluginDataColumns}
          data={detail}
          pagination={false}
          rowKey="project"
          scroll={{ y: 250 }}
          style={{ height: 250 }}
          size="small"
          // bordereds
        /> */}
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
      // <Card
      //   title={
      //     <div className="card-title">
      //       <Row gutter={20}>
      //         <Col span={12} className="header-left">
      //           <div className="icon">
      //             {/* <Avatar size={60} className="avatar" icon={<PieChartOutlined />} /> */}
      //             <span className='header-avatar'>
      //             <PieChartOutlined />
      //             </span>
      //           </div>
      //           <div className="header-txt">
      //             <p className="plugin-name label">{data.plugin_name || data.label}</p>
      //             <p className="plugin-num">{overview.source_total || overview.galaxyx_total}</p>
      //           </div>
      //         </Col>
      //         <Col span={8} className="header-right">
      //           <div>
      //             <p className="label">未拟合</p>
      //             <p className="minus-num">{overview.minus}</p>
      //           </div>
      //         </Col>
      //         <Col span={4}>
      //           <div className="plugin-detail">
      //             {/* <Button type="link" onClick={() => this.jumpToDetail(data)}>
      //               查看详情
      //             </Button> */}
      //             <button className='button-link' onClick={()=>this.jumpToDetail(data)}>
      //               <span>查看详情</span>
      //             </button>
      //           </div>
      //         </Col>
      //       </Row>
      //     </div>
      //   }
      //   bodyStyle={{ padding: 0 }}
      // >
      //   {/* <Table
      //     columns={pluginDataColumns}
      //     data={detail}
      //     pagination={false}
      //     rowKey="project"
      //     scroll={{ y: 250 }}
      //     style={{ height: 250 }}
      //     size="small"
      //     // bordereds
      //   /> */}
      //   <Table
      //     columns={pluginDataColumns}
      //     dataSource={detail}
      //     pagination={false}
      //     rowKey="project"
      //     scroll={{ y: 250 }}
      //     style={{ height: 250 }}
      //     size="small"
      //     // bordereds
      //   />
      // </Card>
    )
  }
  render() {
    return (
      <div className="dqm-list">
        <Tabs defaultActiveKey="0" animated={false}>
          {this.genTabPane()}
        </Tabs>
      </div>
    )
  }
}

export default DQMList
