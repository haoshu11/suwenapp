const musicUrl = 'https://sf1-ttcdn-tos.pstatp.com/obj/developer/sdk/0000-0001.mp3';

Page({
  data: {
    imageUrl: 'https://sf3-ttcdn-tos.pstatp.com/obj/developer/ide/demo/',
    playing: false,
    paused: false,
    isBindCallback: false,
  },
  onPlayCallback: null,
  onLoad() {
    this.backgroundAudioManager = tt.getBackgroundAudioManager();
    const bgam = this.backgroundAudioManager;
    this.canUpdateUI = true;
    bgam.startTime = 0;
    bgam.title = '测试背景音乐';
    bgam.audioPage = { path: 'pages/API/BackgroundAudioManager.play' };
    bgam.onPause(() => {
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
  offPlay() {
    this.setData({
      isBindCallback: false
    }, () => {
      if (this.onPlayCallback) {
        this.backgroundAudioManager.offPlay(this.onPlayCallback);
        this.onPlayCallback = null;
        tt.showToast({
          title: 'offPlay 解绑回调',
          icon: 'none'
        });
      }
    });
  },
  onPlay() {
    this.setData({
      isBindCallback: true
    }, () => {
      const bgam = this.backgroundAudioManager;

      if (bgam) {
        this.onPlayCallback = () => {
          this.updateUI();
          tt.showToast({
            title: 'play',
            icon: 'none'
          });
        };
        bgam.onPlay(this.onPlayCallback);
        tt.showToast({
          title: 'onPlay 绑定回调',
          icon: 'none'
        });
      }
    });
  }
});
