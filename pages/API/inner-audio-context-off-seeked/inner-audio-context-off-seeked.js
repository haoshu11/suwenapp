function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time;
  }

  var hour = parseInt(time / 3600);
  time = time % 3600;
  var minute = parseInt(time / 60);
  time = time % 60;
  var second = time;
  return [hour, minute, second].map(function (n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  }).join(':');
}

var dataUrl = 'https://sf1-ttcdn-tos.pstatp.com/obj/developer/sdk/0000-0001.mp3';
const defaultFormatedTime = '00:00:00';
Page({
  data: {
    imageUrl: 'https://sf3-ttcdn-tos.pstatp.com/obj/developer/ide/demo/',
    formatedCurrentTime: defaultFormatedTime,
    formatedDuration: defaultFormatedTime,
    duration: 0,
    currentTime: 0,
    playing: false,
    paused: false,
    flag: true
  },
  onLoad({
    src
  }) {
    if (src) {
      src = decodeURIComponent(src);
      dataUrl = src;
    }
  },
  onShow: function () {
    if (this.innerAudioContext) {
      return;
    }
    this.canUpdateUI = true;
    var iac = this.innerAudioContext = tt.createInnerAudioContext();
    iac.src = dataUrl;
    iac.startTime = 0;
    iac.autoplay = false;
    iac.loop = false;
    iac.obeyMuteSwitch = false;
    iac.onCanplay(() => {
      this.updateUI();
    });
    iac.onPlay(() => {
      this.updateUI();
    });
    iac.onPause(() => {
      this.updateUI();
    });
    iac.onStop(() => {
      this.updateUI();
    });
    iac.onEnded(() => {
      this.updateUI();
    });
    iac.onTimeUpdate(() => {
      this.updateUI();
    });
    this.onSeeked();
  },
  updateUI() {
    var iac = this.innerAudioContext;
    if (this.canUpdateUI) {
      this.setData({
        formatedCurrentTime: formatTime(parseInt(iac.currentTime || 0) || 0) || defaultFormatedTime,
        formatedDuration: formatTime(parseInt(iac.duration) || 0) || defaultFormatedTime,
        duration: parseInt(iac.duration) || 0,
        currentTime: iac.currentTime || 0,
        playing: !iac.paused
      });
    } else {
      this.setData({
        formatedCurrentTime: formatTime(parseInt(iac.currentTime || 0) || 0) || defaultFormatedTime
      });
    }
  },
  onUnload() {
    if (this.innerAudioContext) {
      this.innerAudioContext.destroy();
    }
  },
  pause() {
    this.innerAudioContext.pause();
    this.updateUI();
  },
  play() {
    this.innerAudioContext.play();
    this.updateUI();
  },
  stop() {
    this.innerAudioContext.stop();
    this.updateUI();
  },
  seeking(e) {
    this.canUpdateUI = false;
  },
  seek(e) {
    this.canUpdateUI = true;
    this.innerAudioContext.seek(e.detail.value);
  },
  offSeeked() {
    this.innerAudioContext.offSeeked();
    this.setData({
      flag: false
    });
    tt.showToast({
      title: '取消监听成功'
    });
  },
  onSeeked() {
    const iac = this.innerAudioContext;

    if (iac) {
      this.setData({
        flag: true
      });
      iac.onSeeked(() => {
        this.updateUI();
        tt.showToast({
          title: 'Seeked触发了'
        });
      });
      tt.showToast({
        title: '监听成功'
      });
    }
  }
});
