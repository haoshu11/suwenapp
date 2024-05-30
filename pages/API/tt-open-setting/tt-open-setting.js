Page({
  data: {
    isAuth: false,
  },
  
  openSetting() {
    tt.openSetting({
      success: res => {
        console.log('打开设置页面成功: ', res.errMsg);
      },
      fail: res => {
        console.log('打开设置页面失败: ', res.errMsg);
      },
      complete: res => {
        console.log('接口已调用: ', res.errMsg);
      }
    });
  },

  handleAuthToGetLocation() {
    tt.authorize({
      scope: 'scope.userLocation',
      success: () => {
        tt.showToast({
          title: '授权成功'
        });
        this.setData({
          isAuth: true
        });
      },
      fail: (res) => {
        tt.showToast({
          title: `授权失败 : ${res.errMsg}`
        });
      }
    });
  }
})