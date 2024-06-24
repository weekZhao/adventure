import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
// import recoTheme from 'vuepress-theme-reco'
import recoTheme from './theme' // 使用本地主题
const head = require('./config/head')
const plugins = require('./config/plugins')
const navbar = require('./config/navbar')
const series = require('./config/series')
const bulletin = require('./config/bulletin')
const algolia = require('./config/algolia')

export default defineUserConfig({
  title: 'Live Travel',
  description: 'Just playing around',
  head,
  theme: recoTheme({
    style: '@vuepress-reco/style-default',
    logo: '/logo.png',
    author: '赵小天',
    authorAvatar: '/logo.png',
    docsRepo: 'https://github.com/vuepress-reco/vuepress-theme-reco-next',
    docsBranch: 'main',
    docsDir: 'example',
    lastUpdatedText: '',

    // 插件
    plugins,
    // 侧边栏
    series,
    // 导航栏
    navbar,
    // 公告
    bulletin,

    // 搜索
    algolia,

    // 分类
    autoSetBlogCategories: true,
    // 自动将分类和标签添加至头部导航条
    // autoAddCategoryToNavbar: true,


    // valineConfig 配置与 1.x 一致
    // valineConfig: {
    //   appId: 'xxx',
    //   appKey: 'xxx',
    //   placeholder: '填写邮箱可以收到回复提醒哦！',
    //   verify: true, // 验证码服务
    //   // notify: true,
    //   recordIP: true,
    //   // hideComments: true // 隐藏评论
    // },
  })
  // debug: true,
})
