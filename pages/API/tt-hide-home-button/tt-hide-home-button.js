Page({
  data: {
    show: false,
  },
  hideHome() {
    tt.hideHomeButton({
      success: (res) => {
        console.log('hideHomeButton 调用成功', res);
        this.setData({
          show: !this.data.show,
        });
      },
      fail: (err) => {
        console.log('hideHomeButton 调用失败', err);
      },
      complete: (res) => {
        console.log('complete 调用', res);
      }
    })
  },
  backHome() {
    tt.switchTab({
      url: '/pages/component/index',
    });
  }
})