const musicUrl = 'https://sf1-ttcdn-tos.pstatp.com/obj/developer/sdk/0000-0001.mp3';

const app = getApp();
Page({
  data: {
    imageUrl: app.globalData.imageUrl,
    playing: false,
    paused: false,
    // 是否正在监听错误
    isOnError: false,
  },
  onErrorCallback: null,
  onLoad() {
    const bgam = tt.getBackgroundAudioManager();
    this.backgroundAudioManager = bgam;
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
    bgam.onEnded(() => {
      this.updateUI();
    });
  },
  onUnload() {
    this.offError();
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
  offError() {
    if (this.onErrorCallback) {
      this.backgroundAudioManager.offError(this.onErrorCallback);
      this.onErrorCallback = null;
      this.setData({
        isOnError: false,
      });
    }
  },
  onError() {
    const bgam = tt.getBackgroundAudioManager();
    this.onErrorCallback = (e) => {
      tt.showModal({
        title: 'onError',
        content: `背景音频播放错误, ${e.errMsg}`,
      });
      this.updateUI();
    };
    bgam.onError(this.onErrorCallback);
    this.setData({
      isOnError: true,
    });
  },
  triggerError() {
    const { isOnError } = this.data;
    if (isOnError) {
      this.backgroundAudioManager.src = `error${musicUrl}`;
    } else {
      tt.showToast({
        title: '当前未绑定 onError 回调监听',
        icon: 'none'
      });
    }
  }
});
