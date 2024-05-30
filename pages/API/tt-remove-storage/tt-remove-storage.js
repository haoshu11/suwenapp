const app = getApp();
Page({
  data: {
    hasStore: false
  },
  setStorage() {
    tt.setStorage({
      key: "byte",
      data: "dance",
      success: () => {
        tt.showToast({
          title: "数据保存成功",
        });
        this.setData({
          hasStore: true
        })
      },
      fail: () => {
        console.log(`setStorage调用失败`);
      },
      complete: () => {
        console.log(`setStorage触发`);
      }
    });
  },
  removeStorage() {
    tt.removeStorage({
      key: "byte",
      success: () => {
        tt.showToast({
          title: "成功移除key为byte的缓存",
          icon: "none"
        });
      },
      fail: () => {
        console.log(`删除缓存失败`);
      },
      complete: () => {
        this.setData({
          hasStore: false
        })
      }
    })
  }
})