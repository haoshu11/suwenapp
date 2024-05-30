let dataUrl = 'https://sf1-ttcdn-tos.pstatp.com/obj/developer/sdk/0000-0001.mp3';
Page({
  data: {
    imageUrl: 'https://sf3-ttcdn-tos.pstatp.com/obj/developer/ide/demo/',
    playing: false,
    paused: false,
    flag: false
  },
  onLoad({ src }) {
    if (this.innerAudioContext) {
      return;
    }
    this.canUpdateUI = true;
    var iac = this.innerAudioContext = tt.createInnerAudioContext();
    iac.src = dataUrl;
    iac.startTime = 0;
    iac.obeyMuteSwitch = false;
    iac.onPlay(() => {
      this.updateUI();
    });
    iac.onPause(() => {
      this.updateUI();
    });
  },
  updateUI() {
    var iac = this.innerAudioContext;
    if (this.canUpdateUI) {
      this.setData({
        playing: !iac.paused
      });
    }
  },
  onUnload() {
    if (this.innerAudioContext) {
      this.innerAudioContext.destroy();
    }
  },
  pause() {
    this.innerAudioContext.pause();
    this.updateUI();
  },
  play() {
    this.innerAudioContext.play();
    this.updateUI();
  },
  stop() {
    this.innerAudioContext.stop();
    this.updateUI();
  },
  offStop() {
    this.innerAudioContext.offStop();
    this.setData({
      flag: false
    });
    tt.showToast({
      title: '取消监听成功'
    });
  },
  onStop() {
    const iac = this.innerAudioContext;
    this.setData({
      flag: true
    }, () => {
      tt.showToast({
        title: '监听成功'
      });
    });
    iac.onStop(() => {
      this.updateUI();
      tt.showToast({
        title: '播放已停止'
      });
    });
  }
});