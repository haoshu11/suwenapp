const dataUrl = 'https://sf1-ttcdn-tos.pstatp.com/obj/developer/sdk/0000-0001.mp3';
const errorUrl = 'https://sf1-ttcdn-tos.pstatp.com/obj/developer/sdk/0000-xxxx.mp3';

Page({
  data: {
    imageUrl: 'https://sf3-ttcdn-tos.pstatp.com/obj/developer/ide/demo/',
    playing: false,
    paused: false,
    isOnError: false
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
    iac.onStop(() => {
      this.updateUI();
    });
    this.onError();
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
  onError() {
    this.setData({
      isOnError: true
    });
    this.innerAudioContext.onError(() => {
      this.updateUI();
      tt.showToast({
        title: '音频播放错误'
      });
    });
  },
  offError() {
    this.innerAudioContext.offError();
    this.setData({
      isOnError: false
    });
    tt.showToast({
      title: '取消监听成功'
    });
  },
  triggerError() {
    const { isOnError } = this.data;
    if (isOnError) {
      this.innerAudioContext.src = errorUrl;
    } else {
      tt.showToast({
        title: '已取消监听 error 事件'
      });
    }
  }
});