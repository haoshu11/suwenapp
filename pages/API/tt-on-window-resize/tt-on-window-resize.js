Page({
  data: {
    height: "",
    width: "",
  },
  windowResize() {
    tt.onWindowResize((res) => {
      console.log("res", res);
      tt.showToast({
        title: "监听窗口事件触发",
        icon: "none",
      });
      this.setData({
        height: res.windowHeight,
        width: res.windowWidth,
      });
    });
  },
});
