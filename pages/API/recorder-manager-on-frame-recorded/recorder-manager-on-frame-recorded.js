const countdown = 6000;
let cdtimer = null;
Page({
  data: {
    cd: countdown,
    isStart: false,
    isPlay: false,
    options: {
      duration: countdown,
      sampleRate: 12000,
      numberOfChannels: 1,
      encodeBitRate: 25000,
      frameSize: 500,
      format: 'pcm'
    },
    frameBufferList: []
  },
  onLoad() {
    this.recorderManager = tt.getRecorderManager();
    // 监听录音开始事件
    this.recorderManager.onStart(() => {
      this.setData({
        isStart: true,
        isPlay: true,
        cd: countdown
      });
      this.startCountDown();
    });
    // 监听录音暂停事件
    this.recorderManager.onPause(() => {
      this.setData({
        isPlay: false
      });
      clearInterval(cdtimer);
      console.log("已暂停录音");
    });
    // 监听录音继续事件
    this.recorderManager.onResume(() => {
      this.setData({
        isPlay: true
      });
      this.startCountDown();
      console.log("已继续录音");
    });
    // 监听录音停止事件
    this.recorderManager.onStop((res) => {
      clearInterval(cdtimer);
      this.setData({
        isStart: false,
        isPlay: false,
        cd: countdown
      });
      console.log("已停止录音,录音文件的地址为: ",res.tempFilePath);
    });
    // 监听已录制完指定帧大小的文件事件
    this.recorderManager.onFrameRecorded(({
      frameBuffer,
      isLastFrame
    }) => {
      console.log("录音分片数据: ",frameBuffer);
      console.log("当前帧是否正常录音结束前的最后一帧: ",isLastFrame);
      if (frameBuffer) {
        const { frameBufferList } = this.data;
        this.setData({
          frameBufferList: [
            {
              frameBuffer: [...(new Int8Array(frameBuffer))].join(','),
              isLastFrame
            },
            ...frameBufferList
          ]
        });
      }
    });
  },
  onUnload: function() {
    this.stop();
  },
  start() {
    this.recorderManager.start(this.data.options);
  },
  stop() {
    // 停止录音
    this.recorderManager.stop();
  },
  pause(){
    // 暂停录音
    this.recorderManager.pause();
  },
  resume(){
    // 继续录音
    this.recorderManager.resume();
  },
  startCountDown() {
    clearInterval(cdtimer);
    cdtimer = setInterval(() => {
      this.setData({
        cd: this.data.cd - 100
      });
    }, 100);
  }
})