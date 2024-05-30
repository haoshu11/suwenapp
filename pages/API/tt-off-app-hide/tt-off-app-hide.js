Page({
  data: {
    result: "",
    isOffAppHide: false,
  },
  callback() {
    this.setData({
      result: "切后台成功"
    })
  },
  onLoad() {
    this.onAppHide();
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
        title: "onAppHide success",
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
      title: "offAppHide success",
      icon: "none",
      duration: 3000,
    });
  },
})