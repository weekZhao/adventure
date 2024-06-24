/* 侧边栏 */
module.exports = {
  '/docs/echarts/': [
    {
      text: 'echarts图表',
      collapsible: true,
      children: ['/docs/echarts/01 echarts常用配置.md', '/docs/echarts/02 echarts项目中应用技巧.md', '/docs/echarts/03 vue中echarts使用.md'],
    },
  ],
  '/docs/node/': [
    // {
    //   text: 'Node学习',
    //   link: '/docs/node',
    //   children: [
    //     {
    //       text: '01 nodejs简介',
    //       link: '/docs/node/01 【nodejs简介】.md',
    //       children: [],
    //     },
    //     {
    //       text: '02 【nodejs开发环境安装】',
    //       link: '/docs/node/02 【nodejs开发环境安装】.md',
    //       children: [],
    //     },
    //     {
    //       text: '03 【npm的使用】',
    //       link: '/docs/node/03 【npm的使用】.md',
    //       children: [],
    //     },
    //     {
    //       text: '04 【nodejs模块化规范：CommonJS】',
    //       link: '/docs/node/04 【nodejs模块化规范：CommonJS】.md',
    //       children: [],
    //     },
    //     {
    //       text: '05 【nodejs内置模块（上）】',
    //       link: '/docs/node/05 【nodejs内置模块（上）】.md',
    //       children: [],
    //     },
    //     {
    //       text: '06 【nodejs内置模块（中）】',
    //       link: '/docs/node/06 【nodejs内置模块（中）】.md',
    //       children: [],
    //     },
    //     {
    //       text: '07 【nodejs内置模块（下）】',
    //       link: '/docs/node/07 【nodejs内置模块（下）】.md',
    //       children: [],
    //     },
    //     {
    //       text: '08 【爬虫】',
    //       link: '/docs/node/08 【爬虫】.md',
    //       children: [],
    //     },
    //     {
    //       text: '09 【原生nodejs路由、获取参数、静态目录】',
    //       link: '/docs/node/09 【原生nodejs路由、获取参数、静态目录】.md',
    //       children: [],
    //     },
    //     {
    //       text: '10 【Express基本使用】',
    //       link: '/docs/node/10 【Express基本使用】.md',
    //       children: [],
    //     },
    //     {
    //       text: '11 【Express服务端渲染】',
    //       link: '/docs/node/11 【Express服务端渲染】.md',
    //       children: [],
    //     },
    //     {
    //       text: '12 【操作mongodb数据库】',
    //       link: '/docs/node/12 【操作mongodb数据库】.md',
    //       children: [],
    //     },
    //     {
    //       text: '13 【操作mysql数据库】',
    //       link: '/docs/node/13 【操作mysql数据库】.md',
    //       children: [],
    //     },
    //     {
    //       text: '14 【接口规范和业务分层】',
    //       link: '/docs/node/14 【接口规范和业务分层】.md',
    //       children: [],
    //     },
    //     {
    //       text: '15 【登录鉴权】',
    //       link: '/docs/node/15 【登录鉴权】.md',
    //       children: [],
    //     },
    //     {
    //       text: '16 【跨域】',
    //       link: '/docs/node/16 【跨域】.md',
    //       children: [],
    //     },
    //     {
    //       text: '17 【文件上传】',
    //       link: '/docs/node/17 【文件上传】.md',
    //       children: [],
    //     },
    //     {
    //       text: '18 【Koa基本使用】',
    //       link: '/docs/node/18 【Koa基本使用】.md',
    //       children: [],
    //     },
    //   ],
    // },
	  {
      text: 'Node学习',
      children: ['01 【nodejs简介】.md', '02 【nodejs开发环境安装】.md', '03 【npm的使用】.md', '04 【nodejs模块化规范：CommonJS】.md', '05 【nodejs内置模块（上）】.md', '06 【nodejs内置模块（中）】.md', '07 【nodejs内置模块（下）】.md', '08 【爬虫】.md', '09 【原生nodejs路由、获取参数、静态目录】.md', '10 【Express基本使用】.md', '11 【Express服务端渲染】.md', '12 【操作mongodb数据库】.md', '13 【操作mysql数据库】.md', '14 【接口规范和业务分层】.md', '15 【登录鉴权】.md', '16 【跨域】.md', '17 【文件上传】.md', '18 【Koa基本使用】.md']
    },
    // {
    //   text: '模块一',
    //   children: ['api', 'plugin']
    // },
    // {
    //   text: '基础',
    //   children: ['introduce', 'usage']
    // },
    // {
    //   text: '高级',
    //   children: ['home', 'series', 'comments']
    // }
  ],
  '/docs/test/': [
    {
      text: 'test文件',
      collapsible: true,
      children: ['aa.md', 'bb.md']
    }
  ]
}
