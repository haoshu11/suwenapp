const musicUrl = 'https://sf1-ttcdn-tos.pstatp.com/obj/developer/sdk/0000-0001.mp3';

Page({
  data: {
    imageUrl: 'https://sf3-ttcdn-tos.pstatp.com/obj/developer/ide/demo/',
    playing: false,
    paused: false,
    isBindCallback: false,
  },
  onPauseCallback: null,
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
    bgam.onStop(() => {
      this.updateUI();
    });
    bgam.onCanplay(() => {
      this.updateUI();
    });
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
  offPause() {
    this.setData({
      isBindCallback: false,
    }, () => {
      if (this.onPauseCallback) {
        this.backgroundAudioManager.offPause(this.onPauseCallback);
        this.onPauseCallback = null;
        tt.showToast({
          title: 'offPause',
          icon: 'none',
        });
      }
    });
  },
  onPause() {
    this.setData({
      isBindCallback: true,
    }, () => {
      const bgam = this.backgroundAudioManager;

      if (bgam) {
        this.onPauseCallback = () => {
          this.updateUI();
          tt.showToast({
            title: 'pause',
            icon: 'none'
          });
        };
        bgam.onPause(this.onPauseCallback);
        tt.showToast({
          title: 'onPause 绑定回调',
          icon: 'none'
        });
      }
    });
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
