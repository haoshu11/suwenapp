Page({
  data: {
    launchQuery: {},
  },
  callback(res) {
    const params = Object.assign({}, res);
    params.query = params.query && JSON.stringify(params.query);
    params.referrerInfo =
      params.referrerInfo && JSON.stringify(params.referrerInfo);
    this.setData({
      launchQuery: params,
    });
  },
  offAppLaunch() {
    tt.offAppLaunch(this.callback);
    console.log("offAppLaunch success");
    tt.showToast({
      title: "已取消监听小程序启动事件",
      icon: "none",
      duration: 3000,
    });
  },
  clearAllAttr() {
    this.setData({
      launchQuery: {},
    });
  },
});
