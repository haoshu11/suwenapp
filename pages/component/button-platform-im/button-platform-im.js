Page({
  data: {
    result: "",
  },

  platformimHandler(e) {
    console.log(e);
    if (!e.detail.errNo) {
      this.setData({
        result: e.detail.errMsg,
      });
      tt.showToast({
        title: "success",
      });
    } else {
      this.setData({
        result: e.detail.errMsg,
      });
      tt.showToast({
        title: "failed",
        icon: "none",
      });
    }
  },
});
