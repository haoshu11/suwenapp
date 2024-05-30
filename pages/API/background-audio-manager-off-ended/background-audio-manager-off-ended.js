const musicUrl = 'https://sf1-ttcdn-tos.pstatp.com/obj/developer/sdk/0000-0001.mp3';

Page({
  data: {
    imageUrl: 'https://sf3-ttcdn-tos.pstatp.com/obj/developer/ide/demo/',
    playing: false,
    paused: false,
    isBindCallback: false,
  },
  onEndedCallback: null,
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
  offEnded() {
    this.setData({
      isBindCallback: false,
    }, () => {
      if (this.onEndedCallback) {
        this.backgroundAudioManager.offEnded(this.onEndedCallback);
        this.onEndedCallback = null;
        tt.showToast({
          title: 'offEnded 解绑回调',
          icon: 'none',
        });
      }
    });
  },
  onEnded() {
    this.setData({
      isBindCallback: true,
    }, () => {
      const bgam = this.backgroundAudioManager;

      if (bgam) {
        this.onEndedCallback = () => {
          tt.showToast({
            title: 'ended',
            icon: 'none'
          });
          this.updateUI();
        };
        bgam.onEnded(this.onEndedCallback);
        tt.showToast({
          title: 'onEnded 绑定回调',
          icon: 'none'
        });
      }
    });
  },
});
