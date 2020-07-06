/** 分页组件 */
import React from 'react'
import { Pagination } from 'antd'

/**
 *
 * @param {pageData: {_page: 1, _num: 10, total: 20}, updatePageData:()=>{}} props
 */
export default function PageOption(props) {
  const options = {
    size: 'small',
    current: props.pageData._page,
    total: props.pageData.total,
    showTotal: (total) => `共 ${total} 条`,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    onChange: (page, pageSize) => {
      const pageData = { _num: pageSize, _page: page }
      props.updatePageData(pageData)
    },
    onShowSizeChange: (current, size) => {
      props.updatePageData({ _num: size, _page: 1 })
    },
  }
  return <Pagination {...options} style={props.style} />
}
