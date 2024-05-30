const musicUrl = 'https://sf1-ttcdn-tos.pstatp.com/obj/developer/sdk/0000-0001.mp3';

const app = getApp();
Page({
  data: {
    imageUrl: app.globalData.imageUrl,
    playing: false,
    paused: false
  },
  onLoad() {
    const backgroundAudioManager = tt.getBackgroundAudioManager();
    this.backgroundAudioManager = backgroundAudioManager;
    this.canUpdateUI = true;
    backgroundAudioManager.startTime = 0;
    backgroundAudioManager.title = '测试背景音乐';
    backgroundAudioManager.audioPage = { path: 'pages/API/BackgroundAudioManager.play' };
    backgroundAudioManager.onPlay(() => {
      this.updateUI();
      tt.showToast({
        title: '背景音频已播放',
        icon: 'none',
      });
    });
    backgroundAudioManager.onPause(() => {
      this.updateUI();
      tt.showToast({
        title: '背景音频已暂停',
        icon: 'none',
      });
    });
    backgroundAudioManager.onStop(() => {
      this.updateUI();
      tt.showToast({
        title: '背景音频已停止',
        icon: 'none',
      });
    });
    backgroundAudioManager.onCanplay(() => {
      this.updateUI();
      tt.showToast({
        title: '背景音频进入可播放状态',
        icon: 'none'
      });
    });
    backgroundAudioManager.onEnded(() => {
      this.updateUI();
      tt.showToast({
        title: '背景音频已结束',
        icon: 'none',
      });
    });
  },
  updateUI() {
    const backgroundAudioManager = this.backgroundAudioManager;
    if (this.canUpdateUI) {
      this.setData({
        playing: !backgroundAudioManager.paused
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
  }
});
