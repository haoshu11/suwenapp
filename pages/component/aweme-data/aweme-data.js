Page({
  data: {
    showType: "avatar",
    disableDefault: false,
  },

  swichType() {
    this.setData({
      showType: "nickname",
    });
  },

  disableJump() {
    this.setData({
      disableDefault: true,
    });
  },

  onAvatarClick() {
    console.log("avatar has been clicked");
    tt.showToast({
      title: "点击头像成功",
    });
  },

  errorHandler(e) {
    console.log(e);
    tt.showToast({
      title: "获取信息失败",
      icon: "none",
    });
  },
});
