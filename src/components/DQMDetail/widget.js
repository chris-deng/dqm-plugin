import React from 'react'
export function formatDetailData(data = {}) {
  const { project_distribution = [], overview = {} } = data

  const totalRate = overview.rate && (overview.rate * 100).toFixed(2) + '%'
  const all = [
    {
      project: '全部',
      target_total: overview.galaxyx_total,
      fitted_total: overview.fitted_total,
      source_total: overview.galaxyx_total,
      minus: overview.minus,
      rate: overview.rate && formatRateToStr(overview.rate),
    },
  ]
  const tmp = project_distribution.map((d) => {
    return {
      ...d,
      rate: d.rate && formatRateToStr(d.rate),
      target_total: d.galaxy_total,
      source_total: d.galaxyx_total,
    }
  })
  const first20 = tmp.slice(0, 20)
  const finnalDetailArr = all.concat(first20)

  return { ...data, dataSource: finnalDetailArr }
}
export const formatRateToStr = (rate) => (rate * 100).toFixed(2) + '%'
export const pluginDataColumns = [
  { title: '项目', dataIndex: 'project', key: 'project' },
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
