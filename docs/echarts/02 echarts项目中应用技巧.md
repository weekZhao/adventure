# 01 echarts项目中应用技巧

## 一、Y轴箭头

```js
axisLine: {
    show: true,
        symbol: ["none", "arrow"], //箭头一端没效果,一端箭头
        symbolOffset: [0, 10], //箭头段移动10个像素
        lineStyle: {
            color: "#000"
        }
},
```

## 二、x轴文字显示不全

### 1、倾斜文字

![1622113614257.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59783cbacdf341f3b6156594a4b96857~tplv-k3u1fbpfcp-zoom-1.image)

```js
xAxis: {
  axisLabel: {
    interval: 0,
    rotate: 40,
  },
}
```

### 2、换行显示

![1622113557902.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1b5a280c3ad43a7aaf56791c56116df~tplv-k3u1fbpfcp-zoom-1.image)

```js
xAxis: {
  axisLabel: {
    formatter: function(params) {
      var newParamsName = "";
      var paramsNameNumber = params.length;
      var provideNumber = 5; //一行显示几个字,当值为1时竖直显示。
      var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
      if (paramsNameNumber > provideNumber) {
        for (var p = 0; p < rowNumber; p++) {
          var tempStr = "";
          var start = p * provideNumber;
          var end = start + provideNumber;
          if (p == rowNumber - 1) {
            tempStr = params.substring(start, paramsNameNumber);
          } else {
            tempStr = params.substring(start, end) + "\n";
          }
          newParamsName += tempStr;
        }
      } else {
        newParamsName = params;
      }
      return newParamsName;
    }
  },
}
```

### 3、添加滚动条

![滚动条.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f40932bf5234574b2e9725ba3725435~tplv-k3u1fbpfcp-zoom-1.image)

```js
dataZoom: [{
  type: 'slider',
  show: true, 
  xAxisIndex: [0],
  height: 10, //滚动条高度
  left: '10%', //滚动条距左侧的百分比
  bottom: 0, ////滚动条距底部的百分比
  start: 0, //滚动条的起始位置
  end: 60, //滚动条的截止位置（按比例分割你的柱状图x轴长度）
  textStyle: false // 不显示左右文字
}],
```

## 三、x轴数据隔一个显示问题解决

原图：

![间隔显示.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19dbd0f1725e41528748717cb7727b77~tplv-k3u1fbpfcp-zoom-1.image)

解决思路：为x轴数据添加 `interval:0`,该属性设置成`0`则表示强制显示所有标签，设置为`1`的话，隔一个标签显示一个标签，以此类推.

```js
xAxis: {
  axisLabel: {
    interval: 0,
  },
}
```

解决后：

![完全展示.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66411983c10747bf929e02f8252f15e3~tplv-k3u1fbpfcp-zoom-1.image)

## 四、echarts使用渐变色报错

报错：`echarts is not defined`

解决方案：

在vue页面重新引入echarts，`import * as echarts from 'echarts'`
## 五、柱状图堆叠
柱状图数据堆叠设置，**同个类目轴上系列配置相同的`stack`值可以堆叠放置。**

![2.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3171ab20a3a4a1f825e6a518abd67ff~tplv-k3u1fbpfcp-zoom-1.image)
```js
series: [
    {
        type: 'bar',
        name: '2020',
        type: 'bar',
        data: data1,
        stack: 'Stack',
        barMaxWidth: 'auto',
        barWidth: 40,
    },
    {
        name: '2021',
        type: 'bar',
        data: data4,
        stack: 'Stack',
        type: 'bar',
        barMaxWidth: 'auto',
        barWidth: 40,
    },
],
```

## 六、饼图各项添加点击事件

```js
// 饼图点击跳转到指定页面
let _this = this;
pieOptions.on("click", function (param) {
    /* 
     if (param.name == "1") {
        _this.$router.push({
            name: "Page1",
        });
    } else if (param.name == "2") {
        _this.$router.push({
            name: "Page2",
        });
    }
    */
});
```

## 七、echarts二次渲染不成功或与第一次相同问题

解决方法： `mychart.setoption({},true);`

> 原因：`chart.setOption(option,notMerge,lazyUpdate);`
>
> option: 图表的配置项和数据
>
> notMerge: 可选，是否不跟之前设置的option进行合并，默认为false，即合并。
>
> lazyUpdate: 可选，在设置完option后是否不立即更新图表，默认为false，即立即更新。

\
## 八、设置饼图外边框

实现思路：设置一个外圈饼图，并配置宽度。

![饼图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c60682442f74348b4bf8dee0f580784~tplv-k3u1fbpfcp-zoom-1.image)

```js
series: [
  // 主要饼图
  {
    type: 'pie',
    center: ['50%', '45%'], // 中心位置
    radius: ['35%', '55%'],
    zlevel: 10,
    label: {
      normal: {
        show: true,
        formatter: '{c}',
        textStyle: {
          fontSize: 14,
          color: '#000'
        },
        position: 'outside'
      }
    },
    data: [
      {
        value: 5,
        name: '自住房'
      },
      {
        value: 15,
        name: '出租房'
      },
      {
        value: 25,
        name: '空置房'
      }
    ]
  },
  {
    name: '外边框',
    type: 'pie',
    clockWise: false, //顺时加载
    hoverAnimation: false, //鼠标移入变大
    center: ['50%', '45%'],
    radius: ['70%', '72%'],
    // 鼠标滑过不展示提示信息
    tooltip: {
      show: false
    },
    label: {
      normal: {
        show: false
      }
    },
    data: [
      {
        value: 1,
        name: '1',
        itemStyle: {
          normal: {
            borderWidth: 2,
            borderColor: '#b0f5f0'
          }
        }
      }
    ]
  }
]
```
## 九、鼠标初次移入echarts 抖动问题
```js
tooltip: {
    transitionDuration:0,
},
默认 0.4

number

提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。
```
## 十、自定义提示信息

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cadd8a5c75d5447fa667fdfbba782838~tplv-k3u1fbpfcp-watermark.image?)
```js
tooltip: {
    formatter: '{b0}<br /><p><i style="border-radius:50%;line-height:25px;width:10px;height:10px;background:#4196df;position: absolute;margin-top:4px;"></i><span style="margin-left:15px">{c0}人'
},
```
## 十一、折线图最高点显示标记信息（光滑曲线）

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1168f4c6af8541e1b408531f5a076b8e~tplv-k3u1fbpfcp-watermark.image?)
```js
series: [
    {
      name: "事件",
      type: "line",
      smooth: true,  // 光滑曲线
      stack: "总量",
      symbol: "circle",
      symbolSize: 5,
      showSymbol: false,
      animationDelay: 2000,
      animationDuration: 1000,
      markPoint: {
        // symbol: 'image://url',
        data: [{ type: "max", name: "最大值" }],
        animationDelay: 3000,
        animationDuration: 1000,
      },
    }
]
```