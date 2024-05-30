Page({
  data: {
    isLogin: false,
  },
  onLoad(query) {
    if (query.isShare) {
      console.log(`来自分享入口：${query.from}打开`)
    }
    tt.checkSession({
      success: () => {
        this.setData({
          isLogin: true,
        });
      },
    });
  },
  onShareAppMessage (shareOption) {
    return {
      path: `/pages/component/button?from=${shareOption.from}&isShare=true`, // ?后面的参数会在转发页面打开时传入onLoad方法
      templateId: '3h8i11h04d3g40njx3',
      title:'页面传入的分享标题',
      success () {
        console.log('分享面板调起成功，不代表分享成功');
      },
      fail (e) {
        console.log('分享面板调起失败', e);
      }
    }
  },
  submit() {
    tt.showToast({
      title: "submit success",
    });
  },
  reset() {
    tt.showToast({
      title: "reset success",
    });
  },
  getPhoneNumberHandler(e) {
    if (e.detail.errMsg.slice(-2) === "ok") {
      console.log(
        "获取手机号的加密数据成功,开发者可以把该数据传回到自己的服务端进行解密获取手机号,加密数据为: ",
        e
      );
      tt.showToast({
        title: "success",
      });
    } else {
      console.log("获取手机号的加密数据失败: ", e);
      tt.showToast({
        title: "failed",
        icon: "none",
      });
    }
  },
  login() {
    tt.login({
      success: (res) => {
        this.setData({
          isLogin: true,
        });
      },
      fail: (err) => {
        console.log("登录失败", err);
        tt.showToast({
          title: "登录失败",
          icon: "fail",
        });
      },
    });
  },
});
