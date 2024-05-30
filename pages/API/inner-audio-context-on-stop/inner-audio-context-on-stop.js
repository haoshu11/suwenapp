let dataUrl = 'https://sf1-ttcdn-tos.pstatp.com/obj/developer/sdk/0000-0001.mp3';
Page({
  data: {
    imageUrl: 'https://sf3-ttcdn-tos.pstatp.com/obj/developer/ide/demo/',
    playing: false,
    stopped: true,
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
    innerAudioCtx.onCanplay(() => {
      console.log("onCanplay");
      this.updateUI();
    });
    innerAudioCtx.onPlay(() => {
      console.log("onPlay");
      this.setData({
        stopped: false
      });
      this.updateUI();
    });
    innerAudioCtx.onEnded(() => {
      console.log("onEnded");
      this.setData({
        stopped: true
      });
      this.updateUI();
    })
    innerAudioCtx.onStop(() => {
      console.log("onStop");
      this.setData({
        stopped: true
      });
      this.updateUI();
      tt.showToast({
        title: "onStop事件触发",
        icon: 'none',
      });
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
  play() {
    this.innerAudioCtx.play();
  },
  stop() {
    this.innerAudioCtx.stop();
  },
});