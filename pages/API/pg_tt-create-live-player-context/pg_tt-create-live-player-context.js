Page({
  data: {
    autoplay: false,
    src: "https://sf3-ttcdn-tos.pstatp.com/obj/developer/bytdance.flv",
    objectFit: "contain",
    orientation: "vertical",
    muted: false,
    fullScreen: false,
    signature: {
      enable: false,
      content: "bytedance",
      position: 0,
      color: "#FFFF11",
    },
  },
  onReady() {
    try {
      this.livePlayerContext = tt.createLivePlayerContext("myLivePlayer");
      console.log("this.livePlayerContext", this.livePlayerContext);
    } catch (err) {
      console.log("createLivePlayerContext fail: ", err);
    }
  },
  onError(err) {
    console.log("直播播放出错了: ", err);
  },

  livePlay() {
    this.livePlayerContext.play();
  },
  liveStop() {
    this.livePlayerContext.stop();
  },
  liveMute() {
    this.setData({
      muted: !this.data.muted,
    }, () => {
      if (this.data.muted) {
        this.livePlayerContext.mute();
      } else {
        this.livePlayerContext.unmute();
      }
    });
  },
  fullScreen() {
    if (this.data.fullScreen) {
      this.livePlayerContext.exitFullScreen();
    } else {
      this.livePlayerContext.requestFullScreen();
    }
  },
});
