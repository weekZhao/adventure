/* 导航栏 */
module.exports = [
  { text: '首页', link: '/' },
  {
    text: '笔记',
    children: [
      { text: 'echarts', link: '/docs/echarts/01 echarts常用配置.md' },
      { text: 'node', link: '/docs/node/01 【nodejs简介】.md' },
      { text: 'test', link: '/docs/test/aa.md' },
    ]
  },
  { text: '时间线', link: '/docs/timeline/' },
  {
    text: '随笔',
    children: [
      { text: '元旦', link: '/docs/essays/2023-01-01.md' }
    ]
  }
]
