Page({
  data: {},

  errorHandler(e) {
    console.log(e);
    tt.showToast({
      title: "获取信息失败",
      icon: "none",
    });
  },
});
