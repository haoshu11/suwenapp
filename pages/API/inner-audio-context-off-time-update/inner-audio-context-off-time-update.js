let dataUrl = 'https://sf1-ttcdn-tos.pstatp.com/obj/developer/sdk/0000-0001.mp3';
Page({
  data: {
    imageUrl: 'https://sf3-ttcdn-tos.pstatp.com/obj/developer/ide/demo/',
    playing: false,
    paused: false,
    flag: false,
    count: 0
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
      this.finish = false;
      this.updateUI();
    });
    iac.onPause(() => {
      this.updateUI();
    });
    iac.onStop(() => {
      this.updateUI();
      this.finish = true;
    });
    iac.onEnded(() => {
      this.finish = true;
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
    if(this.finish) {
      this.setData({
        count: 0
      });
    }
    this.innerAudioContext.play();
    this.updateUI();
  },
  stop() {
    this.innerAudioContext.stop();
    this.updateUI();
  },
  offTimeUpdate() {
    this.innerAudioContext.offTimeUpdate();
    this.setData({
      flag: false,
      count: 0
    });
    tt.showToast({
      title: '取消监听成功'
    });
  },
  onTimeUpdate() {
    const iac = this.innerAudioContext;
    this.setData({
      flag: true,
    }, () => {
      tt.showToast({
        title: '监听成功'
      });
    });
    iac.onTimeUpdate(() => {
      this.updateUI();
      this.setData({
        count: ++this.data.count
      });
    });
  }
});