const app = getApp();
Page({
  data: {
    hasStore: false
  },
  setStorage() {
    tt.setStorageSync("byte", "dance");
    tt.showToast({
      title: '数据保存成功',
      success: () => {
        this.setData({
          hasStore: true
        })
      }
    });
  },
  removeStorage() {
    try {
      tt.removeStorageSync("byte");
      tt.showToast({
        title: "成功移除key为byte的缓存",
        icon: "none"
      });
      this.setData({
        hasStore: false
      })
    } catch (error) {
      console.log('移除缓存失败')
    }
  }
})