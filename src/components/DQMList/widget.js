import React from 'react'
/** 处理数据校验指标数据，分类 */
export function formatMetricDataByCategory(data = {}) {
  const { items = [] } = data

  const categorySet = items.map((item) => item.category)
  const categorySetNoRepeat = Array.from(new Set(categorySet))

  const res = categorySetNoRepeat.map((category) => {
    const filterCate = items.filter((item) => item.category === category)
    const firstCategory = filterCate[0] || {}

    // 转化比例为百分比形式
    const formatFilterCate = filterCate.map((plugin_item) => {
      const { detail = [] } = plugin_item
      const filterDetail = detail.map((d) => {
        const formatRate = d.rate && (d.rate * 100).toFixed(2) + '%'
        return { ...d, rate: formatRate }
      })
      return {
        ...plugin_item,
        detail: filterDetail,
        plugin_name: plugin_item.plugin_name,
        plugin_code: plugin_item.plugin_code,
      }
    })

    return {
      category,
      category_name: firstCategory.category_name || firstCategory.category || firstCategory.type,
      plugin_items: formatFilterCate,
    }
  })

  return res
}

export const genPluginDataColumns = (data = []) => {
  const first = data[0] || {}
  const dimension = first.dimension || {}

  return [
    { title: dimension.name, dataIndex: dimension.code, key: dimension.code },
    { title: '目标数据', dataIndex: 'target_total', key: 'target_total' },
    {
      title: '拟合数据',
      dataIndex: 'fitted_total',
      key: 'fitted_total',
      render: (fitted_total) => <span>{fitted_total || '-'}</span>,
    },
    { title: '源数据', dataIndex: 'source_total', key: 'source_total' },
    { title: '差数', dataIndex: 'minus', key: 'minus' },
    { title: '比例', dataIndex: 'rate', key: 'rate' },
  ]
}
