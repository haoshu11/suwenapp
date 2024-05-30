const musicUrls = [
  'https://sf1-ttcdn-tos.pstatp.com/obj/developer/sdk/0000-0002.mp3',
  'https://sf1-ttcdn-tos.pstatp.com/obj/developer/sdk/0000-0001.mp3',
  'https://sf1-ttcdn-tos.pstatp.com/obj/developer/sdk/0000-0003.mp3'
];

const app = getApp();
Page({
  data: {
    imageUrl: app.globalData.imageUrl,
    playing: false,
    paused: false,
    curSrcIdx: 1
  },
  onPrevCallback: null,
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
    this.onPrevCallback = () => {
      const { curSrcIdx } = this.data;
      this.setData({
        curSrcIdx: curSrcIdx <= 0 ? musicUrls.length - 1 : curSrcIdx - 1
      }, () => {
        this.backgroundAudioManager.src = musicUrls[this.data.curSrcIdx];
        this.updateUI();
      });
    };
    bgam.onPrev(this.onPrevCallback);
  },
  onUnload() {
    this.offPrev();
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
      this.backgroundAudioManager.src = musicUrls[this.data.curSrcIdx];
    }
    this.backgroundAudioManager.play();
    this.updateUI();
  },
  stop() {
    this.backgroundAudioManager.stop();
    this.updateUI();
  },
  offPrev() {
    if (this.onPrevCallback) {
      this.backgroundAudioManager.offPrev(this.onPrevCallback);
      this.onPrevCallback = null;
      tt.showToast({
        title: 'offPrev',
        icon: 'none',
      });
    }
  },
});
