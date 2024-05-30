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
  // 设置播放倍速
  playbackRate() {
    this.videoContext.playbackRate(2.0);
  },
});