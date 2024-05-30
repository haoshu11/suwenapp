Page({
  onReady(res) { },
  inputValue: '',
  data: {
    src: '',
    isFullscreen: false,
    isLoopPlay: false,
    isAutoPlay: false,
    isShowPlayBtn: true,
    isShowPlaybackRate: false,
    isShowControls: true,
    playBtnPosition: 'center',
    objectFitNum: 0,
    objectFitType: 'contain',
    poster: 'https://s3.pstatp.com/toutiao/static/img/logo.201f80d.png',
    preRollUnitId: '2k735ltco0o7gg0s46',
    postRollUnitId: 'hefbc5g67f9g1axb6p',
    isMuted: false,
    isShowMute: false,
    isVslideGesture: false,
    isFullVslideGesture: true,
    isProgressGesture: false,
    isPlayGesture: false,
    direction: -90,
    directionNum: 0,
    isPlayInBackground: false,
  },
  bindadended(e) {
    tt.showToast({
      title: '贴片广告播放结束',
      icon: 'success'
    });
    console.log('广告播放结束', e);
  },
  bindadload(e) {
    tt.showToast({
      title: '贴片广告加载成功',
      icon: 'success'
    });
    console.log('广告加载成功', e);
  },
  bindaderror(e) {
    tt.showToast({
      title: '贴片广告播放出错',
      icon: 'fail',
    });
    console.log('广告出错', e);
  },
  bindadclose(e) {
    tt.showToast({
      title: '贴片广告非自然结束',
      icon: 'success'
    });
    console.log('关闭广告', e);
  },
  bindadstart(e) {
    tt.showToast({
      title: '贴片广告开始播放',
      icon: 'success'
    });
    console.log('播放广告', e);
  },
  bindwaiting(e) {
    tt.showToast({
      title: '触发视频缓冲事件',
      icon: 'loading'
    });
    console.log('视频正在缓冲', e);
  },
  bindtimeupdate(e) {
    console.log('播放进度变化', e);
  },
  bindprogress(e) {
    const { buffered } = e.detail;
    console.log(`缓冲进度变化 buffered = ${buffered}`);
  },
  bindended(e) {
    tt.showToast({
      title: '触发视频播放结束事件',
      icon: 'success'
    });
    console.log('视频已经播放结束', e);
  },
  bindpause(e) {
    tt.showToast({
      title: '触发视频暂停事件',
      icon: 'loading'
    });
    console.log('视频暂停了', e);
  },
  bindplay(e) {
    tt.showToast({
      title: '触发视频播放事件',
      icon: 'success'
    });
    console.log('视频开始播放了', e);
  },
  binderror(e) {
    tt.showToast({
      title: '触发视频播放出错事件',
      icon: 'fail'
    });
    console.log('视频播放出错了', e);
  },
  bindfullscreenchange(e) {
    tt.showToast({
      title: '触发监听视频是否全屏事件',
      icon: 'success'
    });
    console.log(e.detail.fullScreen ? '进入全屏了' : '退出全屏了', e);
  },
  bindloadedmetadata(e) {
    tt.showToast({
      title: '视频元数据加载完成',
      icon: 'success'
    });
    console.log('视频元数据加载完成', e);
  },
  bindseekcomplete(e) {
    console.log('跳转播放完成', e);
  },
  bindplaybackratechange(e) {
    tt.showToast({
      title: '视频倍速改变完成',
      icon: 'success'
    });
    console.log('视频倍速改变完成', e);
  },
  bindmutechange(e) {
    this.setData({
      isMuted: e.detail.isMuted
    });
    tt.showToast({
      title: '静音状态改变完成',
      icon: 'success'
    });
    console.log('静音状态改变完成', e);
  },
  bindcontroltap(e) {
    console.log('点击了控件', e);
  },
  bindenterbackground(e) {
    console.log('进入小窗播放', e);
  },
  bindclosebackground(e) {
    console.log('关闭小窗播放', e);
  },
  bindleavebackground(e) {
    console.log('离开小窗进入app', e);
  },
  bindInputBlur(e) {
    this.inputValue = e.detail.value;
  },
  bindButtonTap() {
    tt.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: (res) => {
        this.setData({
          src: res.tempFilePath
        });
      }
    });
  },

  switchFullScreen() {
    this.setData({
      isFullscreen: !this.data.isFullscreen
    });
  },

  switchLoopPlay() {
    this.setData({
      isLoopPlay: !this.data.isLoopPlay
    });
  },

  switchPlayBtn() {
    this.setData({
      isShowPlayBtn: !this.data.isShowPlayBtn
    });
  },

  switchControls() {
    this.setData({
      isShowControls: !this.data.isShowControls
    });
  },

  switchFit() {
    const objectFitEnum = ['contain', 'fill', 'cover'];
    this.setData({
      objectFitType: objectFitEnum[this.data.objectFitNum % 3],
      objectFitNum: this.data.objectFitNum + 1
    }, () => {
      tt.showToast({
        title: '裁剪模式已切换为' + this.data.objectFitType,
        icon: 'none'
      });
    });
  },

  switchMuted() {
    this.setData({
      isMuted: !this.data.isMuted
    });
  },

  switchMuteShow() {
    this.setData({
      isShowMute: !this.data.isShowMute,
    });
  },

  switchVslideGesture() {
    this.setData({
      isVslideGesture: !this.data.isVslideGesture
    });
  },

  switchFullVslideGesture() {
    this.setData({
      isFullVslideGesture: !this.data.isFullVslideGesture
    });
  },

  switchProgressGesture() {
    this.setData({
      isProgressGesture: !this.data.isProgressGesture
    });
  },

  switchPlayGesture() {
    this.setData({
      isPlayGesture: !this.data.isPlayGesture
    });
  },

  switchDirection() {
    const directionList = [90, 0, -90];
    this.setData({
      direction: directionList[this.data.directionNum % 3],
      directionNum: this.data.directionNum + 1
    }, () => {
      tt.showToast({
        title: '方向已切换为 ' + this.data.direction + ' 度',
        icon: 'success'
      });
    })
  },

  switchPlayInBackground() {
    this.setData({
      isPlayInBackground: !this.data.isPlayInBackground,
    });
  }
});
