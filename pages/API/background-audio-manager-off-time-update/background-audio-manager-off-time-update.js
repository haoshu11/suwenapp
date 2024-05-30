let musicUrl = 'https://sf1-ttcdn-tos.pstatp.com/obj/developer/sdk/0000-0001.mp3';

const app = getApp();
Page({
  data: {
    imageUrl: app.globalData.imageUrl,
    playing: false,
    paused: false,
    count: 0,
    isBindCallback: false,
  },
  onLoad() {
    const bgam = tt.getBackgroundAudioManager();
    this.backgroundAudioManager = bgam;
    this.canUpdateUI = true;
    bgam.startTime = 0;
    bgam.title = "测试背景音乐";
    bgam.audioPage = {path:"pages/API/BackgroundAudioManager.play"};
    bgam.onPlay(() => {
      this.finish = false
      this.updateUI();
    });
    bgam.onPause(() => {
      this.updateUI();
    });
    bgam.onStop(() => {
      this.finish = true
      this.updateUI();
    });
    bgam.onEnded(() => {
      this.finish = true
      this.updateUI();
    });
  },
  updateUI() {
    var bgam = this.backgroundAudioManager;
    if (this.canUpdateUI) {
      this.setData({
        playing: !bgam.paused
      });
    }
  },
  pause() {
    this.backgroundAudioManager.pause();
    this.updateUI();
  },
  play() {
    if(this.finish) {
      this.setData({
        count: 0
      });
    }
    if(!this.backgroundAudioManager.src) {
      this.backgroundAudioManager.src = musicUrl;
    }
    this.backgroundAudioManager.play();
    this.updateUI();
  },
  stop() {
    this.backgroundAudioManager.stop();
    this.updateUI();
  },
  offTimeUpdate(){
    this.setData({
      isBindCallback: false
    }, () => {
      const bgam = this.backgroundAudioManager;

      if (bgam) {
        bgam.offTimeUpdate();
        this.setData({
          count: 0
        });
        tt.showToast({
          title: 'offTimeUpdate 解绑回调',
          icon: 'none',
        });
      }
    });
  },
  onTimeUpdate() {
    this.setData({
      isBindCallback: true,
    }, () => {
      const bgam = this.backgroundAudioManager;

      if (bgam) {
        bgam.onTimeUpdate(() => {
          this.updateUI();
          this.setData({
            count: ++this.data.count
          });
        });
        tt.showToast({
          title: 'onTimeUpdate 绑定回调',
          icon: 'none',
        });
      }
    });
  }
});
