Component({
  data: {
    autoplay: true,
    src: 'https://sf3-ttcdn-tos.pstatp.com/obj/developer/bytdance.flv',
    objectFit: 'contain',
    orientation: 'vertical',
    muted: false,
    signature: {
      enable: true,
      content: "bytedance",
      position: 3,
      color: "#FFF",
    },
  },
  lifetimes: {
    attached() {
      this.ctx = tt.createLivePlayerContext('myLive',this);
    }
  },
  properties: {},
  methods: {
    stateChange(e) {
      console.log('播放状态变化 statechange: ', e);
    },

    livePlay(e) {
      console.log('开始调用播放：', this.ctx);
      this.ctx.play();
    },

    changeObjectFit(e) {
      this.setData({
        objectFit: this.data.objectFit === 'contain' ? 'fillCrop' : 'contain'
      });
    },

    liveStop(e) {
      this.ctx.stop();
    },

    liveMute(e) {
      this.setData({
        muted: !this.data.muted
      });
    },

    onError(err) {
      console.log("直播播放出错了: ", err)
    },
  }
});