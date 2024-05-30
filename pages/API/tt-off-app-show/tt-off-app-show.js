Page({
  data: {
    showQuery: {},
    isOnAppShow: false
  },
  onLoad() {
    this.onAppShow();
  },
  callback(res) {
    const params = Object.assign({}, res);
    params.query = params.query && JSON.stringify(params.query);
    params.referrerInfo = params.referrerInfo && JSON.stringify(params.referrerInfo);
    this.setData({
      showQuery: params,
    });
  },
  onAppShow() {
    this.setData({
      isOnAppShow: true,
    }, () => {
      tt.onAppShow(this.callback);
      console.log("onAppShow success");
      tt.showToast({
        title: "onAppShow success",
        icon: "none",
        duration: 3000,
      });
    });
  },
  offAppShow() {
    this.setData({
      isOnAppShow: false
    }, () => {
      tt.offAppShow(this.callback);
      console.log("offAppShow success");
      tt.showToast({
        title: "offAppShow success",
        icon: "none",
        duration: 3000,
      });
    });
  },
  clearAllAttr() {
    this.setData({
      showQuery: {},
    });
  },
});
