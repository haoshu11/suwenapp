Page({
  data: {
    videoId: "",
    result: "",
  },
  onShareAppMessage(option) {
    const that = this;
    return {
      channel: "video",
      title: "测试分享视频",
      desc: "测试描述",
      extra: {
        videoTopics: ["hello", "hi"],
        withVideoId: true,
      },
      success(res) {
        console.log(
          "转发发布器已调起，并不意味着用户转发成功，微头条不提供这个时机的回调"
        );
        console.log("分享成功的回调传递的参数: ", res);
        that.setData({
          videoId: res.videoId,
        });
      },
      fail() {
        console.log("转发发布器调起失败");
      },
    };
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
