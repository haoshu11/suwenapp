Page({
  data: {
    length: 0
  },
  async onLoad(options) {
    this.listenBack();
    const pages = await this.getPages();
    this.setData({
      length: pages.length
    })
  },
  getPages() {
    return new Promise((resolve, reject) => {
      resolve(getCurrentPages());
    })
  },
  listenBack() {
    if (tt.canIUse("enableAlertBeforeUnload")) {
      tt.enableAlertBeforeUnload({
        message: "是否确认返回",
        success: (res) => {
          console.log("开启页面返回询问对话框成功", res);
        },
        fail: (err) => {
          tt.showToast({
            title: "开启返回询问对话框失败"
          });
          console.log("开启页面返回询问对话框失败", err);
        },
        complete(res) {
          console.log("开启页面返回询问对话框结束", res);
        }
      });
    } else {
      tt.showModal({
        title: "提示",
        content:
          "当前客户端版本过低，无法使用该功能，请升级客户端或关闭后重启更新。",
      });
    }
  }
})