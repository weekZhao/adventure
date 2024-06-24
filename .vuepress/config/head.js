module.exports = [
  // DNS 预解析 dns-prefetch , 是为了优化图片加载的速度
  ['link', { rel: 'dns-prefetch', href: 'https://s2.loli.net' }],
  // 网页标签栏图标
  // ['link', { rel: 'icon', href: '/vuepress/favicon.ico' }],
  // 移动栏优化 （搜索框在获得焦点时会放大，并且在失去焦点后可以左右滚动，优化）
  ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
  // 百度SEO优化
  ['meta', { name: 'baidu-site-verification', content: 'code-CekZJFvXZM' }]
]
