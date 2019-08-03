# wxmp-qrcode
适用于微信小程序的二维码生成器，基于Canvas生成，支持中文的输入。可在原生小程序，mpvue，taro中使用。
![qrcode](/doc/img/qrcode.png)
## 安装
```bash
npm install wxmp-qrcode
```

## 使用
1. 创建一个canvas,设置其`id`,与`canvas-id`， 并设置canvas的样式，二维码基于其大小生成并居中
```html
<canvas id="cav-qrcode" canvas-id="cav-qrcode"></canvas>
```
2. 引入包并使用
```javascript
import QR from 'wxmp-qrcode'
QR.draw(str, canvasId, () => {
  console.log('draw success!')  
})
```

## api
```javscript
/**
 * 根据canvas尺寸，画出合适居中的qrcode
 * @param {Object} str 二维码的内容 (必须)
 * @param {Object} canvasId canvasId的值 (必须)
 * @param {Object} $this 传入组件的this,兼容在组件中生成二维码 （可选，可省略该参数）
 * @param {Object} callback 回调函数 (可选)
 */
draw: function (str, canvasId, $this, callback)

/**
* 清除canvas内容
* @param {Object} canvasId canvasId (必须)
* @param {Object} callback 回调函数 （可选）
*/
clear: function (canvasId, callback) 
```

## 注意
1. canvas中 id, canvas-id必须保持一致

  - id 获取canvas节点，自动计算大小使用, **二维码大小基于canvas生成**
  - canvas-id 绘制二维码使用

2. 如果在组件中使用，需要传入组件的this，`draw(str, canvasId, componentThis)`

  - 具体参见 https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.createCanvasContext.html

3. 可以保存二维码为临时图片地址

  - 具体可参见 https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.canvasToTempFilePath.html
  - bug: 该方法有时保存的图片会有一个竖条。
```javascript
createQrCode: function (content, canvasId) {
  QR.api.draw(content, canvasId)
  this.canvasToTempImage(canvasId)
},

//获取临时缓存图片路径
canvasToTempImage: function (canvasId) {
  wx.canvasToTempFilePath({
    canvasId, 
    success: function (res) {
      let tempFilePath = res.tempFilePath; // 临时图片地址，可在放入图片src中使用
    }
  })
}
```


#### 原生小程序wxmp中使用

1. 在项目设置中选择 `使用npm模块`
2. 如果第一次使用npm模块，需要首先在根目录中`npm init`, 之后再安装模块 `npm i wxmp-qrcode` 
3. 在工具中选择 `构建npm`
4. index.wxml
```html
<view class="container">
  <canvas id="{{canvasId}}" canvas-id="{{canvasId}}"></canvas>
  <button bindtap="creatQRCode"> 生成二维码 </button>
</view>
```
4. index.wxss
```css
canvas {
  border: 1rpx solid #eee;
  width: 400rpx;
  height: 400rpx;
}
button {
  margin-top: 100rpx;
}
```
5. index.js
```javascript
import QR from './qrcode'

Page({
  data: {
    canvasId: 'canvasId',
    QRdata: '你好 wxmp-qrcode'
  },
  creatQRCode () {
    let str = this.data.QRdata
    let canvasId = this.data.canvasId
    QR.draw(str, canvasId)
  }
})
```

#### 在mpvue中使用

1. 根目录中 install 
```bash
npm i wxmp-qrcode
```

2. index.vue
```vue
<template>
  <div class="container">
    <canvas id="canvasId" canvas-id="canvasId"></canvas>
    <button @tap="creatQRCode"> 生成二维码 </button>
  </div>
</template>

<script>
import QR from 'wxmp-qrcode'

export default {
  data () {
    return {
      canvasId: 'canvasId',
      QRdata: '你好 wxmp-qrcode'
    }
  },

  methods: {
    creatQRCode () {
      let str = this.QRdata
      let canvasId = this.canvasId
      QR.draw(str, canvasId)
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

canvas {
  border: 1rpx solid #eee;
  width: 400rpx;
  height: 400rpx;
}

button {
  margin-top: 100rpx;
}

</style>

```

#### 在taro中使用

1. 根目录中 install 
```bash
npm i wxmp-qrcode
```

2. index.jsx
```javascript
import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import QR from 'wxmp-qrcode'
import './index.css'

export default class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      canvasId: 'canvasId',
      QRdata: '你好 wxmp-qrcode'
    }
  }

  createQRcode = () => {
    let canvasId = this.state.canvasId
    let QRdata = this.state.QRdata
    QR.draw(QRdata, canvasId)
  }

  render () {
    return (
      <View className='container' >
          <canvas id={this.state.canvasId} canvas-id={this.state.canvasId}></canvas>
          <Button onClick={this.createQRcode}> 生成二维码 </Button>
      </View>
    )
  }
}

```
3. index.css
```css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
canvas {
  border: 1rpx solid #eee;
  width: 600rpx;
  height: 400rpx;
}

button {
  margin-top: 100rpx;
}

```

#### 感谢
- 欢迎大家提交pr,issue
- 项目改进自 https://github.com/demi520/wxapp-qrcode

