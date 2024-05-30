const app = getApp();
Page({
  setStorage() {
    tt.setStorage({
      key: "byte",
      data: "dance",
      success: () => {
        tt.showToast({
          title: "设置缓存成功",
        });
        this.setData({
          hasStore: true
        });
      },
      fail: (res) => {
        tt.showToast({
          title: "setStorage调用失败",
        });
        console.log(`setStorage调用失败`, res);
      },
      complete: () => {
        console.log(`setStorage触发`);
      }
    });
  },
  getStorage() {
    try {
      const didShownAd = tt.getStorageSync("byte");
      if (didShownAd) {
        tt.showToast({
          title: "缓存内容为" + didShownAd,
        });
      } else {
        tt.showToast({
          title: "暂无缓存内容",
        });
      }
    } catch (err) {
      console.log(`getStorageSync调用失败`);
    }
  }
})