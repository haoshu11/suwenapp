Page({
  data: {
    videoContext: undefined,
  },
  onReady() {
    this.videoContext = tt.createVideoContext("myVideo");
  },
  // 播放
  play() {
    this.videoContext.play();
  },
  // 设置音量
  setMediaVolume() {
    this.videoContext.setMediaVolume({
      value: 0.2,
      success: () => {
        console.log(`setMediaVolume success`)
      },
      fail: (res) => {
        const { errMsg, errNo } = res
        console.log(`errMsg = ${errMsg}, errNo = ${errNo}`)
      },
      complete: (res) => {
        console.log(`setMediaVolume complete res = ${res}`)
      }
   })
  },
  // 获取音量
  getMediaVolume() {
    this.videoContext.getMediaVolume({
      success: (res) => {
        const { value } = res
        console.log(`getMediaVolume volume = ${value}`)
      },
      fail: (res) => {
        const { errMsg, errNo } = res
        console.log(`errMsg = ${errMsg}, errNo = ${errNo}`)
      },
      complete: (res) => {
        console.log(`getMediaVolume complete res = ${res}`)
      }
   })
  },
});