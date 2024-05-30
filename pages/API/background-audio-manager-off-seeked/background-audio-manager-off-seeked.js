function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return '00:00:00';
  }

  let remainTime = time;

  const hour = parseInt(remainTime / 3600);
  remainTime = remainTime % 3600;

  const minute = parseInt(remainTime / 60);
  remainTime = remainTime % 60;

  const second = time;

  return [hour, minute, second].map(function (n) {
    return isAddZero(n);
  }).join(':');

  function isAddZero(target) {
    return String(target).padStart(2, '0');
  }
}

const musicUrl = 'https://sf1-ttcdn-tos.pstatp.com/obj/developer/sdk/0000-0001.mp3';
Page({
  data: {
    imageUrl: 'https://sf3-ttcdn-tos.pstatp.com/obj/developer/ide/demo/',
    formatedCurrentTime: formatTime(),
    formatedDuration: formatTime(),
    duration: 0.01,
    currentTime: 0,
    playing: false,
    paused: false,
    isBindCallback: false,
  },
  onSeekedCallback: null,
  onLoad() {
    const bgam = tt.getBackgroundAudioManager();
    this.backgroundAudioManager = bgam;
    this.canUpdateUI = true;
    bgam.startTime = 0;
    bgam.title = '测试背景音乐';
    bgam.audioPage = { path: 'pages/API/BackgroundAudioManager.play' };
    bgam.obeyMuteSwitch = false;
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
    bgam.onTimeUpdate(() => {
      this.updateUI();
    });
  },
  updateUI() {
    const bgam = this.backgroundAudioManager;
    if (this.canUpdateUI) {
      this.setData({
        formatedCurrentTime: formatTime(parseInt(bgam.currentTime || 0)),
        formatedDuration: formatTime(parseInt(bgam.duration || 0)),
        duration: parseInt(bgam.duration) || 0,
        currentTime: bgam.currentTime || 0,
        playing: !bgam.paused
      });
    } else {
      this.setData({
        formatedCurrentTime: formatTime(parseInt(bgam.currentTime || 0))
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
  seeking(e) {
    this.canUpdateUI = false;
  },
  seek(e) {
    this.canUpdateUI = true;
    this.backgroundAudioManager.seek(e.detail.value);
  },
  offSeeked() {
    this.setData({
      isBindCallback: false
    }, () => {
      if (this.onSeekedCallback) {
        this.backgroundAudioManager.offSeeked(this.onSeekedCallback);
        this.onSeekedCallback = null;
      }
      tt.showToast({
        title: 'offSeeked 解绑回调',
        icon: 'none'
      });
    });
  },
  onSeeked() {
    this.setData({
      isBindCallback: true,
    }, () => {
      const bgam = this.backgroundAudioManager;
      if (bgam) {
        this.onSeekedCallback = () => {
          this.updateUI();
          tt.showToast({
            title: 'seeked',
            icon: 'none'
          });
        };
        bgam.onSeeked(this.onSeekedCallback);
        tt.showToast({
          title: 'onSeeked 绑定回调',
          icon: 'none'
        });
      }
    });
  }
});
