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
  onNextCallback: null,
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
    bgam.onEnded(() => {
      this.updateUI();
    });
    this.onNextCallback = () => {
      console.log('onNext');
      const { curSrcIdx } = this.data;
      this.setData({
        curSrcIdx: curSrcIdx >= musicUrls.length ? 0 : curSrcIdx + 1,
      }, () => {
        this.backgroundAudioManager.src = musicUrls[this.data.curSrcIdx];
        this.updateUI();
      });
    };
    bgam.onNext(this.onNextCallback);
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
  offNext() {
    if (this.onNextCallback) {
      this.backgroundAudioManager.offNext(this.onNextCallback);
      this.onNextCallback = null;
      tt.showToast({
        title: 'offNext',
        icon: 'none',
      });
    }
  },
});
