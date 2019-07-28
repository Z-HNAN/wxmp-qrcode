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
      QR.api.draw(str, canvasId)
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
