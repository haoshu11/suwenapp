Page({
  data: {
    result: "",
  },

  eventHandler(e) {
    console.log(e);
    if (!e.detail.errNo) {
      tt.showToast({
        title: "success",
      });
    } else {
      tt.showToast({
        title: "failed",
        icon: "none",
      });
    }
    this.setData({
      result: e.detail.errMsg,
    });
  },
});
