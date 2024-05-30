const musicUrl = 'https://sf1-ttcdn-tos.pstatp.com/obj/developer/sdk/0000-0001.mp3';

const app = getApp();
Page({
  data: {
    imageUrl: app.globalData.imageUrl,
    playing: false,
    paused: false
  },
  onCanplayCallback: null,
  backgroundAudioManager: null,

  onLoad() {
    this.backgroundAudioManager = tt.getBackgroundAudioManager();
    const bgam = this.backgroundAudioManager;
    this.canUpdateUI = true;
    bgam.startTime = 0;
    bgam.title = '测试背景音乐';
    bgam.audioPage = { path: 'pages/API/BackgroundAudioManager.play' };
    bgam.onPlay(() => {
      this.updateUI();
    });
    bgam.onPause(() => {
      this.updateUI();
    });
    bgam.onStop(() => {
      this.updateUI();
    });
    this.onCanplayCallback = () => {
      this.updateUI();
      tt.showToast({
        title: '背景音频进入可播放状态',
        icon: 'none'
      });
    };
    bgam.onCanplay(this.onCanplayCallback);
    bgam.onEnded(() => {
      this.updateUI();
    });
  },
  updateUI() {
    const bgam = this.backgroundAudioManager;
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
    if (!this.backgroundAudioManager.src) {
      this.backgroundAudioManager.src = musicUrl;
    }
    this.backgroundAudioManager.play();
    this.updateUI();
  },
  stop() {
    this.backgroundAudioManager.stop();
    this.updateUI();
  },
  offCanplay() {
    if (this.onCanplayCallback) {
      this.backgroundAudioManager.offCanplay(this.onCanplayCallback);
      this.onCanplayCallback = null;
      tt.showToast({
        title: 'offCanplay',
        icon: 'none',
      });
    }
  }
});
