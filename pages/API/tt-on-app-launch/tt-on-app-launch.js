Page({
  data: {
    launchQuery: {},
  },
  onLoad: function (options) {
    tt.onAppLaunch((res) => {
      const params = Object.assign({}, res);
      console.log("scene: ", params.scene);
      console.log("path: ", params.path);
      console.log("query: ", params.query);
      console.log("referrerInfo: ", params.referrerInfo);
      console.log("showFrom: ", params.showFrom);
      params.query = params.query && JSON.stringify(params.query);
      params.referrerInfo =
        params.referrerInfo && JSON.stringify(params.referrerInfo);
      this.setData({
        launchQuery: params,
      });
      console.log("onAppLaunch success");
      tt.showToast({
        title: "已成功监听小程序启动事件",
        icon: "none",
        duration: 3000,
      });
    });
  },
  clearAllAttr() {
    this.setData({
      launchQuery: {},
    });
  },
});
