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
      frameSize: 50,
    }
  },
  onFrameRecordedCallback: null,
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
    // 监听已录制完指定帧大小的文件事件
    this.onFrameRecordedCallback = ({
      frameBuffer,
      isLastFrame
    }) => {
      console.log('录音分片数据: ', frameBuffer);
      console.log('当前帧是否正常录音结束前的最后一帧: ', isLastFrame);
    };
    this.recorderManager.onFrameRecorded(this.onFrameRecordedCallback);
  },
  onUnload: () => {
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
        console.log('已拒绝授权录音功能:', res.errMsg);
        const { duration } = this.data.options;
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
  offFrameRecorded() {
    if (this.onFrameRecordedCallback) {
      this.recorderManager.offFrameRecorded(this.onFrameRecordedCallback);
      this.onFrameRecordedCallback = null;
      tt.showModal({
        title: 'Tip',
        content: 'offFrameRecordedCallback success',
      });
    }
  }
});
