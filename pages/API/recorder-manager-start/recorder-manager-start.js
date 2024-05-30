const countdown = 6000;
let cdtimer = null;
Page({
  data: {
    cd: countdown,
    isStart: false,
    options: {
      duration: countdown,
      sampleRate: 12000,
      numberOfChannels: 1,
      encodeBitRate: 25000,
      frameSize: 100,
    }
  },
  onLoad() {
    this.recorderManager = tt.getRecorderManager();
    this.recorderManager.onStart(() => {
      this.setData({
        isStart: true,
        cd: countdown
      });
      this.startCountDown();
    });
    // 监听录音停止事件
    this.recorderManager.onStop((res) => {
      clearInterval(cdtimer);
      this.setData({
        isStart: false,
        cd: countdown
      });
    });
  },
  onUnload: function() {
    this.stop();
  },
  start() {
    this.recorderManager.start(this.data.options);
  },
  stop() {
    // 停止录音
    this.recorderManager.stop();
  },
  startCountDown() {
    clearInterval(cdtimer);
    cdtimer = setInterval(() => {
      this.setData({
        cd: this.data.cd - 100
      });
    }, 100);
  }
})