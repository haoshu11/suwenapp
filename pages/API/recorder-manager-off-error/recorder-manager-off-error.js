const countDown = 60000;
let cdTimer = null;
Page({
  data: {
    cd: countDown,
    isStart: false,
    isPlay: false,
    options: {
      duration: countDown,
      sampleRate: 12000,
      numberOfChannels: 1,
      encodeBitRate: 25000,
      frameSize: 100,
    }
  },
  onErrorCallback: null,
  onLoad() {
    this.recorderManager = tt.getRecorderManager();
    // 监听录音开始事件
    this.recorderManager.onStart(() => {
      this.setData({
        isStart: true,
        isPlay: true,
        cd: countDown
      });
      this.startCountDown();
    });
    // 监听录音暂停事件
    this.recorderManager.onPause(() => {
      this.setData({
        isPlay: false
      });
      clearInterval(cdTimer);
      console.log('已暂停录音');
    });
    // 监听录音继续事件
    this.recorderManager.onResume(() => {
      this.setData({
        isPlay: true
      });
      this.startCountDown();
      console.log('已继续录音');
    });
    // 监听录音停止事件
    this.recorderManager.onStop((res) => {
      clearInterval(cdTimer);
      this.setData({
        isStart: false,
        isPlay: false,
        cd: countDown
      });
      console.log('已停止录音,录音文件的地址为: ', res.tempFilePath);
    });
    // 监听录音错误事件
    this.onErrorCallback = (err) => {
      console.error('录音错误: ', err.errMsg);
      tt.showModal({
        title: 'onError',
        content: `error: ${err.errMsg}`,
      });
    };
    this.recorderManager.onError(this.onErrorCallback);
  },
  onUnload: function () {
    this.stop();
  },
  start() {
    tt.authorize({
      scope: 'scope.record',
      success: (res) => {
        console.log('已允许授权录音功能: ', res.errMsg);
        if (res.data['scope.record'] === 'ok') {
          // 开始录音
          this.recorderManager.start(this.data.options);
          console.log('已开始录音');
        }
      },
      fail: (res) => {
        const { duration } = this.data.options;
        console.log('已拒绝授权录音功能:', res.errMsg);
        if (res.data['scope.record'] === 'auth deny') {
          tt.showToast({
            title: '用户已拒绝授权录音功能',
            duration,
            icon: 'none'
          });
        }
      },
    });
  },
  stop() {
    // 停止录音
    this.recorderManager.stop();
  },
  pause() {
    // 暂停录音
    this.recorderManager.pause();
  },
  resume() {
    // 继续录音
    this.recorderManager.resume();
  },
  startCountDown() {
    clearInterval(cdTimer);
    cdTimer = setInterval(() => {
      this.setData({
        cd: this.data.cd - 100
      });
    }, 100);
  },
  offError() {
    if (this.onErrorCallback) {
      this.recorderManager.offError(this.onErrorCallback);
      this.onErrorCallback = null;
      tt.showToast({
        title: 'offError',
        icon: 'none',
      });
    }
  },
});