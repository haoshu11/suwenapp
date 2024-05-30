Page({
  data: {
    text: [],
  },
  lines: [],
  onLoad: function () {
    // Do some initialize when page load.
    this.updateText('onLoad 页面加载');
  },
  onReady: function() {
    // Do something when page ready.
    this.updateText('onReady 页面初次渲染完成');
  },
  onShow: function() {
    // Do something when page show.
    this.updateText('onShow 页面显示');
  },
  onHide: function() {
    // Do something when page hide.
    this.updateText('onHide 页面隐藏');
  },
  onUnload: function() {
    // Do something when page close.
  },
  onResize: function () {
    // Do something when page resize in seven split screen
  },
  onPullDownRefresh: function () {
    // Do something when pull down.
  },
  onReachBottom: function () {
    // Do something when page reach bottom.
  },
  onShareAppMessage: function () {
    // return custom share data when user share.
  },
  onUploadDouyinVideo: function () {
    // Do something when page upload douyin video.
  },
  onPageScroll: function () {
    // Do something when page scroll
  },
  updateText: function(str) {
    const time = new Date().toLocaleString();
    this.lines.push({
      date: time,
      lifeCycle: str
    });
    this.setData({
      text: this.lines
    })
  },
  onItemClick() {
    tt.navigateTo({
      url: `pg_life-cycle-page?params=navigateTo`, //demo示例，一般路径形式：/pages/detail/detail?key=${value}
      success(res) {
        console.log(res);
      },
      fail(res) {
        console.log("navigateTo调用失败", res);
      },
    });
  },
})