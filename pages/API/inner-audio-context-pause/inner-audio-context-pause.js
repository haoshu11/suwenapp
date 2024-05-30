let dataUrl = 'https://sf1-ttcdn-tos.pstatp.com/obj/developer/sdk/0000-0001.mp3';
Page({
  data: {
    imageUrl: 'https://sf3-ttcdn-tos.pstatp.com/obj/developer/ide/demo/',
    playing: false,
    pause: false,
  },
  onLoad() {
    if (this.innerAudioCtx) {
      return;
    }
    const innerAudioCtx = this.innerAudioCtx = tt.createInnerAudioContext();
    innerAudioCtx.src = dataUrl;
    innerAudioCtx.startTime = 0;
    innerAudioCtx.obeyMuteSwitch = false;
    innerAudioCtx.onCanplay(() => {
      console.log("onCanplay");
    });
    innerAudioCtx.onPlay(() => {
      console.log("onPlay");
      this.setData({ playing: true, pause: false })
    });
    innerAudioCtx.onPause(() => {
      console.log("onPause");
      this.setData({ playing: false, pause: true })
    });
    innerAudioCtx.onStop(() => {
      console.log("onStop");
      this.setData({ playing: false, pause: false })
    });
    innerAudioCtx.onError((err) => {
      console.log("onError: ", err);
    });
  },
  onUnload() {
    if (this.innerAudioCtx) {
      this.innerAudioCtx.offCanplay();
      this.innerAudioCtx.destroy();
    }
  },
  pause() {
    if(this.data.playing) {
      this.innerAudioCtx.pause();
    }
  },
  play() {
    if(!this.data.playing) {
      this.innerAudioCtx.play();
    }
  },
  stop() {
    if(this.data.playing || this.data.pause) {
      this.innerAudioCtx.stop();
    }
  },
});