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
