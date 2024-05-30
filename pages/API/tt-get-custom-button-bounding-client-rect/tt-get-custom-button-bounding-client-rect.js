Page({
  data: {
    leftIconKeys: [],
    leftIconInfo: {},
    capsuleKeys: [],
    capsuleInfo: {}
  },
  getCustomButtonInfo() {
    if(tt.canIUse("getCustomButtonBoundingClientRect")) {
      try {
        let res = tt.getCustomButtonBoundingClientRect();
        this.setData({
          leftIconInfo: res.leftIcon,
          leftIconKeys: Object.keys(res.leftIcon),
          capsuleInfo: res.capsule,
          capsuleKeys: Object.keys(res.capsule)
        })
      } catch (error) {
        // getCustomButtonBoundingClientRect只适用于自定义导航栏
        // 非自定义（默认）导航栏调用将抛出错误
        console.log(error);
      }
    }  else {
      tt.showModal({
        title: "提示",
        content:
          "当前客户端版本过低，无法使用该功能，请升级客户端或关闭后重启更新。",
      });
    }
  }
})