Page({
  onPullDownRefresh() {
    tt.showToast({
      title: 'onPullDownRefresh',
      duration: 2000,
    });
  },
  stopPullDownRefresh() {
    tt.stopPullDownRefresh({
      success: () => {
        tt.showToast({
          title: 'stopPullDownRefresh',
          duration: 2000,
        });
      },
      fail(err) {
        tt.showModal({
          title: 'stopPullDownRefresh fail',
          content: err.errMsg,
          showCancel: false,
        });
      },
      complete() {},
    });
  },
  startPullDownRefresh() {
    tt.startPullDownRefresh();
  },
});
