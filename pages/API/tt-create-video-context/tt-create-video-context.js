Page({
  data: {
    videoVolume: '0',
    playbackRate: '1.0', // 播放速率 (0.5 0.75 1 1.5 2)
    playbackRateList: ['0.75', '1.0', '1.5', '2.0'],
  },
  async onReady() {
    try {
      this.videoContext = tt.createVideoContext('myVideo');
      console.log('this.videoContext', this.videoContext);
    } catch (err) {
      console.log(err);
    }
  },
  getComponent() {
    return new Promise((resolve, reject) => {
      this.selectComponent('#createVdeo', res => {
        if (res) {
          resolve(res);
          return;
        }
        reject('获取组件实例出错')
      });
    })
  },
  play() {
    this.videoContext.play();
    tt.showToast({
      title: 'play',
      icon: 'none'
    });
  },
  stop() {
    this.videoContext.stop();
    tt.showToast({
      title: 'stop',
      icon: 'none'
    });
  },
  pause() {
    this.videoContext.pause();
    tt.showToast({
      title: 'pause',
      icon: 'none'
    });
  },
  seek() {
    this.videoContext.seek(10);
    tt.showToast({
      title: '跳转到10s处',
      icon: 'none'
    });
  },
  fullScreen() {
    this.videoContext.requestFullScreen();
  },
  exitFullScreen() {
    this.videoContext.exitFullScreen();
    tt.showToast({
      title: '退出全屏',
    });
  },
  setWaterMark() {
    console.log('videoContext setWaterMark');
    this.videoContext.setWaterMark({
      enable: true,
      color: '#DD0000',
      success: () => {
        tt.showToast({
          title: 'setWaterMark success',
          icon: 'success',
        });
      },
      fail: (err) => {
        tt.showToast({
          title: `setWaterMark fail, reason: ${err}`,
          icon: 'fail',
        });
      },
      complete: () => {
        tt.showToast({
          title: 'setWaterMark completed',
        });
      },
    });
  },
  getMediaVolume() {
    this.videoContext.getMediaVolume({
      success: (currentVolume) => {
        console.log(currentVolume);
        tt.showModal({
          title: 'getMediaVolume success',
          content: `current volume: ${currentVolume.value}`,
        });
      },
      fail: (err) => {
        tt.showToast({
          title: `getMediaVolume fail, reason: ${err}`,
          icon: 'fail',
        });
      },
      complete: () => {
        console.log('getMediaVolume completed');
      },
    });
  },
  setVideoVolume(e) {
    const value = String(e.detail.value).trim();
    const inputReg = /(^0\.[0-9]+$)|1/;

    const newVideoVolume = inputReg.test(value)
      ? value.match(inputReg)[0].replace(/\.$/, '.0')
      : this.data.videoVolume;

    this.setData({
      videoVolume: newVideoVolume,
    }, () => {
      this.videoContext.setMediaVolume({
        value: Number(newVideoVolume),
        success: () => {
          tt.showModal({
            title: 'setMediaVolume success',
            content: `current volume: ${newVideoVolume}`,
          });
        },
        fail: (err) => {
          tt.showToast({
            title: `setMediaVolume fail, reason: ${err}`,
            icon: 'fail',
          });
        },
        complete: () => {
          console.log('setMediaVolume completed');
        },
      });
    });
  },
  setPlayBackRate(e) {
    const { value: playbackRate } = e.detail;

    this.setData({
      playbackRate,
    }, () => {
      this.videoContext.playbackRate(Number(playbackRate));
      tt.showToast({
        title: `rate: ${playbackRate}`
      });
    });
  },
});