import QR from 'wxmp-qrcode'

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
