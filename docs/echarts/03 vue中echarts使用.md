# 03 vue中echarts使用

## 1、安装echarts依赖

```js
npm install echarts -S 
//或者使用淘宝的镜像
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install echarts -S
```

## 2、main.js中引入

- 全局引入

```js
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
```

- 按需引入

```jsx
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
```

>  由于全局引入会将所有的echarts图表打包，导致体积过大 ,建议按需引入

## 3、在vue中使用

```html
<div class="echarts" id="echarts"></div>
```

- 必须设置宽高

```css
.echarts {
  width: 20rem;
  height: 14rem;
}
```

- 方法调用

 ```js
drawEchart() {
      let pieOptions = this.$echarts.init(document.getElementById("echarts"));
      pieOptions.setOption({
          tooltip: {
          show: false,
        }，
          // 。。。。。。
      })
}
 ```

## 4、自适应页面变化

```js
window.addEventListener("resize", function() {
    pieOptions.resize();
});
```



----

## 拓展

饼图各项添加点击事件

```js
// 饼图点击跳转到指定页面
let _this = this;
pieOptions.on("click", function (param) {
    if (param.name == "1") {
        _this.$router.push({
            name: "Page1",
        });
    } else if (param.name == "2") {
        _this.$router.push({
            name: "Page2",
        });
    }
});
```

