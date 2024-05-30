let dataUrl = 'https://sf1-ttcdn-tos.pstatp.com/obj/developer/sdk/0000-0001.mp3';
Page({
  data: {
    imageUrl: 'https://sf3-ttcdn-tos.pstatp.com/obj/developer/ide/demo/',
    playing: false,
    paused: false,
    canPlay: false,
  },
  onLoad() {
    if (this.innerAudioCtx) {
      return;
    }
    this.canUpdateUI = true;
    const innerAudioCtx = this.innerAudioCtx = tt.createInnerAudioContext();
    innerAudioCtx.src = dataUrl;
    innerAudioCtx.startTime = 0;
    innerAudioCtx.obeyMuteSwitch = false;
    this.onCanplay();
    innerAudioCtx.onPlay(() => {
      console.log("onPlay");
      this.updateUI();
    });
    innerAudioCtx.onPause(() => {
      console.log("onPause");
      this.updateUI();
    });
    innerAudioCtx.onStop(() => {
      console.log("onStop");
      this.updateUI();
    });
    innerAudioCtx.onError((err) => {
      console.log("onError: ", err);
    });
  },
  updateUI() {
    if (this.canUpdateUI) {
      this.setData({
        playing: !this.innerAudioCtx.paused
      });
    }
  },
  onUnload() {
    if (this.innerAudioCtx) {
      this.innerAudioCtx.offCanplay();
      this.innerAudioCtx.destroy();
    }
  },
  pause() {
    this.innerAudioCtx.pause();
  },
  play() {
    this.innerAudioCtx.play();
  },
  stop() {
    this.innerAudioCtx.stop();
  },
  offCanplay() {
    this.innerAudioCtx.offCanplay();
    tt.showToast({
      title: '取消监听成功'
    });
    this.setData({
      canPlay: false
    });
  },
  onCanplay() {
    this.setData({
      canPlay: true
    });
    this.innerAudioCtx.onCanplay(() => {
      console.log("onCanplay");
      tt.showToast({
        title: "监听onCanplay成功",
        icon: "none",
        duration: 3000,
      });
      this.setData({
        canPlay: true
      });
      this.updateUI();
    });
  }
});