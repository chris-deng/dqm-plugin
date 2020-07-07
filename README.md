# dqm-plugin

dqm 前端插件

1.  数据结构

// 指标概览的数据结构

```
{
  items: [
    {
      category: 'resource',   // 一级tab标题分类
      category_name: '资源对比',    // 一级tab标题

      plugin_code: "fitted_hostname", // 指标的英文代号
      plugin_name: "机器名拟合",    // 指标中文名

      detail: [    // 数据对比table的数据源
        {
          project: 'g48',   // 项目
          dimension:{
            code: 'project',  // code : 'region',
            name: '项目',     // name: 'region'
          },                 // 维度
          target_total: 167,  // 目标数据
          target_name:  'atlas',   // 对比的系统名称
          source_total: 167,    // 源数据
          source_name: 'cube',   // 源系统名称
          fitted_total: 149,   // 拟合数据
          minus: 18,           // 差数
          rate:  1.120805,      // 比例((rate * 100 ).toFixed(2))
        }
      ],

      overview: {             // 概览的数据
        fitted_total: 142888,
        target_total: 142942,
        source_total:142942,  // 概览里的拟合数据
        minus: 54,         // 未拟合数据
        rate: 1.0003779183696322
      },
      collect_time: 1593486000.126918,  // 收集数据的事件（时间戳）
    }
  ]
}
```

// 详情数据结构 - （接口）

1. 额外添加可筛选条件，以及 options （不需请求 auth project 及 region）
2.

// 历史趋势

2. 接口请求是否需要 auth 权限，如 accessToken， authtoken，目前看 galaxyx 没有再加额外的头字段

3. 一个容器中切换两个组件（列表 、 详情 + 变化趋势）设置全局变量随时切换组件

### 计划

1. 数据对比概览页面

2. 数据详情页面

3. 数据详情筛选

4. 变化趋势

5. 关于脚手架，去除源文件，留打包文件，并将 index 的打包文件放到更目录

### 实施

1. 关于传参 -- 需传入 project_code 作为数据一致性对比的项目参数
2. 定制 tab 项 -- 用户传入 include_category 数组作为一级 tab 显示与否的筛选条件

### 引用

1. 下载依赖包

```
npm install @nie/dqm-plugin
```

2. 引用组件

```
import DQM from '@nie/dqm-plugin'
import '@nie/dqm-plugin/css/index.css'

<DQM auth_data={authToken: '', accessToken: ''} project_code='accdocker' plugin_include={['resource']} />
```

3. 设置 nginx 代理

```
proxy: {
  '/dqm/api': 'http://dqm.nie.netease.com:8080'
}
```
