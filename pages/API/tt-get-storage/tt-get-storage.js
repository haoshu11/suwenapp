const app = getApp();
Page({
  setStorage() {
    tt.setStorage({
      key: 'byte',
      data: 'dance',
      success: () => {
        tt.showToast({
          title: '设置缓存成功',
        });
        this.setData({
          hasStore: true
        })
      },
      fail: (res) => {
        console.log('setStorage调用失败', res);
      },
      complete: () => {
        console.log('setStorage触发');
      }
    });
  },
  getStorage() {
    tt.getStorage({
      key: 'byte',
      success: (res) => {
        tt.showToast({
          title: '缓存内容为' + res.data,
        });
      },
      fail: () => {
        console.log('getStorage调用失败');
      },
      complete: () => {
        this.setData({
          hasStore: false
        })
      }
    })
  }
})