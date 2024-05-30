Page({
  data: {
    status: '暂未开始',
  },
  onUnload() {
    this.recorderManager && this.recorderManager.offStop();
  },
  onStopCallback: null,
  startRecord() {
    this.recorderManager = tt.getRecorderManager();
    const options = {
      duration: 60000,
      sampleRate: 12000,
      numberOfChannels: 1,
      encodeBitRate: 25000,
      frameSize: 100,
    };
    if (!this.onStopCallback) {
      this.onStopCallback = (res) => {
        tt.showModal({
          title: '录音结束',
          content: JSON.stringify(res),
        });
        this.setData({
          status: '录音结束',
        });
      };
      this.recorderManager.onStop(this.onStopCallback);
    }

    this.recorderManager.start(options);

    tt.showToast({ title: '点击了开始录音' });
    this.setData({
      status: '正在录音',
    });
  },
  stopRecord() {
    this.recorderManager && this.recorderManager.stop();
  }
});