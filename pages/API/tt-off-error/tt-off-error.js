Page({
  data: {
    err: "",
    isOffError: false
  },
  onLoad() {
    this.onError();
  },
  handleTap() {
    if (this.data.isOffError) {
      tt.showToast({
        title: "已取消监听 onError，无法监听到触发的错误",
        icon: "none"
      });
      return;
    }
    throw new Error("handleTap error"); // 当触发该函数时，会报错 Uncaught Error: handleTap error
  },
  clearErr() {
    this.setData({
      err: ""
    })
  },
  offError() {
    tt.offError(this.handleError);
    this.setData({
      isOffError: true,
      err: ""
    })
    tt.showToast({
      title: "offError success",
      icon: "none",
      duration: 3000,
    });
  },
  onError() {
    this.setData({
      isOffError: false
    }, () => {
      tt.onError(this.handleError);
    });
    tt.showToast({
      title: "onError success",
      icon: "none",
      duration: 3000,
    });
  },
  handleError(e) {
    console.log(e);
    this.setData({
      err: e
    })
  },
})