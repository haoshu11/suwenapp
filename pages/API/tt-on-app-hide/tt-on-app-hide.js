Page({
  data: {
    result: "",
    isOffAppHide: true,
  },
  callback() {
    this.setData({
      result: "切后台成功"
    })
  },
  clearResult() {
    this.setData({
      result: ""
    })
  },
  onAppHide() {
    this.setData({
      isOffAppHide: false,
      result: ""
    }, () => {
      console.log("onAppHide success");
      tt.onAppHide(this.callback);
      tt.showToast({
        title: "onAppHide",
        icon: "none",
        duration: 3000,
      });
    });
  },
  offAppHide() {
    tt.offAppHide(this.callback);
    console.log("offAppHide success");
    this.setData({
      isOffAppHide: true
    })
    tt.showToast({
      title: "offAppHide",
      icon: "none",
      duration: 3000,
    });
  },
})