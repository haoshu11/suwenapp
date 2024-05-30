Page({
  data: {
    setting: {},
    isAuth: false
  },
  onLoad() {
    this.authorizeAll();
  },
  authorizeAll() {
    const authList = [
      'userLocation',
      'address',
      'record',
      'album',
      'camera'
    ];

    Promise.all(authList.map(auth => {
      const scope = `scope.${auth}`;
      return new Promise((resolve, reject) => {
        tt.authorize({
          scope,
          success: (res) => {
            resolve(res);
          },
          fail: (res) => {
            reject({ ...res, scope });
          },
        });
      });
    })).then(res => {
      console.log(res);
      tt.showToast({
        title: '全部授权成功'
      })
    }).catch(res => {
      tt.showModal({
        title: `${res.scope} 未授权`,
        content: res.errMsg
      });
    });
  },
  getSetting() {
    const that = this;
    tt.getSetting({
      success(res) {
        console.log('getSetting success', res.authSetting);
        that.setData({
          setting: res.authSetting
        });
      },

      fail(res) {
        // 当 API 执行失败后调用, 预定义返回消息格式为${API_NAME}:fail
        console.log(res.errMsg);
      },

      complete(res) {
        // 当 API 执行完成（无论成功或者失败）后都会调用, 预定义返回消息格式为${API_NAME}:ok / fail
        console.log(res.errMsg);
      }
    });
  },
  openSetting() {
    tt.openSetting({
      success: res => {
        console.log('调起设置页面成功');
      },
      fail: err => {
        console.log('调起设置页面失败');
      }
    });
  }
});