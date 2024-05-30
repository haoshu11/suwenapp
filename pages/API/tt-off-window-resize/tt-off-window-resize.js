Page({
  data: {
    height: "",
    width: "",
  },
  windowResizeCallback(res) {
    console.log("res", res);
    tt.showToast({
      title: "已监听窗口事件",
      icon: "none",
    });
    this.setData({
      height: res.windowHeight,
      width: res.windowWidth,
    });
  },
  onWindowResize() {
    tt.onWindowResize(this.windowResizeCallback);
  },
  offWindowResize() {
    tt.offWindowResize(this.windowResizeCallback);
  },
});
