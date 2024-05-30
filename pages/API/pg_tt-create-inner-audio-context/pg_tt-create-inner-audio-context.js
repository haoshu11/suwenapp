function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return '00:00:00';
  }

  const hour = parseInt(time / 3600);
  time = time % 3600;
  const minute = parseInt(time / 60);
  time = time % 60;
  const second = time;
  return [hour, minute, second].map(function (n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  }).join(':');
}

let dataUrl = 'https://sf1-ttcdn-tos.pstatp.com/obj/developer/sdk/0000-0001.mp3';

Page({
  data: {
    imageUrl: 'https://sf3-ttcdn-tos.pstatp.com/obj/developer/ide/demo/',
    formatedCurrentTime: formatTime(),
    formatedDuration: formatTime(),
    duration: 0,
    currentTime: 0,
    playing: false,
    paused: false,
    buffered: 0,
    updateCount: 0,
    isDestory: false,
  },
  onLoad({
    src
  }) {
    if (src) {
      src = decodeURIComponent(src);
      dataUrl = src;
    }
  },
  onShow() {
    this.create();
  },
  updateUI() {
    const iac = this.innerAudioContext;
    if (this.canUpdateUI) {
      this.setData({
        formatedCurrentTime: formatTime(parseInt(iac.currentTime || 0) || 0),
        formatedDuration: formatTime(parseInt(iac.duration) || 0),
        duration: parseInt(iac.duration) || 0,
        currentTime: iac.currentTime || 0,
        playing: !iac.paused,
        buffered: parseInt(iac.buffered) || 0
      });
    } else {
      this.setData({
        formatedCurrentTime: formatTime(parseInt(iac.currentTime || 0) || 0)
      });
    }
  },
  onUnload() {
    this.destroy();
  },
  /** 销毁当前的内置音频对象 */
  destroy() {
    this.setData({
      buffered: 0,
      updateCount: 0,
    });
    if (this.innerAudioContext) {
      this.stop();
      this.innerAudioContext.destroy();
      this.innerAudioContext = null;
      this.setData({
        isDestory: true
      });
      tt.showToast({
        title: '音频已被销毁',
        icon: 'success'
      });
    }
  },
  /** 创建当前的音频对象 */
  create() {
    this.setData({
      isDestory: false,
    }, () => {
      this.canUpdateUI = true;
      this.innerAudioContext = tt.createInnerAudioContext();
      tt.showToast({
        title: '创建实例成功',
        icon: 'none'
      });
      const iac = this.innerAudioContext;
      iac.src = dataUrl;
      iac.startTime = 0;
      iac.autoplay = false;
      iac.loop = false;
      iac.obeyMuteSwitch = false;
      iac.onPlay(() => {
        this.updateUI();
        tt.showToast({
          title: '当前音频已播放',
          icon: 'success',
          duration: 3000,
        });
      });
      iac.onPause(() => {
        this.updateUI();
        tt.showToast({
          title: '当前音频已暂停',
          icon: 'success',
          duration: 3000,
        });
      });
      iac.onStop(() => {
        this.updateUI();
        tt.showToast({
          title: '当前音频已停止',
          icon: 'success',
          duration: 3000,
        });
        this.setData({
          updateCount: 0,
        });
      });
      iac.onEnded(() => {
        this.updateUI();
        tt.showToast({
          title: '当前音频已结束',
          icon: 'success',
          duration: 3000,
        });
        this.setData({
          updateCount: 0,
        });
      });
      iac.onTimeUpdate(() => {
        this.updateUI();
        this.setData({
          updateCount: ++this.data.updateCount,
        });
      });
      iac.onError(({
        errMsg
      }) => {
        tt.showToast({
          title: `当前音频出错了: ${errMsg}`,
          icon: 'success',
          duration: 3000,
        });
        this.updateUI();
      });
      iac.onWaiting(() => {
        tt.showToast({
          title: '当前音频进度缓冲中',
          icon: 'success',
          duration: 3000,
        });
        this.updateUI();
      });
      iac.onSeeking(() => {
        this.updateUI();
      });
      iac.onSeeked(() => {
        this.updateUI();
      });
    });
  },
  /** 音频暂停 */
  pause() {
    this.innerAudioContext.pause();
    this.updateUI();
  },
  /** 音频播放 */
  play() {
    if (!this.innerAudioContext) return;

    this.innerAudioContext.play();
    this.updateUI();
  },
  /** 音频停止 */
  stop() {
    this.innerAudioContext.stop();
    this.updateUI();
  },
});