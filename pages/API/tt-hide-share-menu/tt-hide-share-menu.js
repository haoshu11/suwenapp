Page({
  data: {
    isHide: false
  },

  onLoad() {
    this.showShareMenu();
  },

  showShareMenu() {
    tt.showShareMenu({
      menus: ["share", "record"],
      success: (res) => {
        this.setData({
          isHide: true
        });
      },
    });
  },

  hideShareMenu(menus) {
    const currentMenus = menus.currentTarget.dataset.menus.split(',');
    tt.hideShareMenu({
      menus: currentMenus,
      success: () => {
        // 当 API 成功执行后调用，预定义返回消息格式为${API_NAME}:ok
        tt.showToast({
          title: '隐藏成功',
          icon: 'success'
        });
        this.setData({
          isHide: false
        });
      },
      fail() {
        // 当 API 执行失败后调用, 预定义返回消息格式为${API_NAME}:fail
        tt.showToast({
          title: '隐藏失败',
          icon: 'fail'
        });
      },

      complete(res) {
        // 当 API 执行完成（无论成功或者失败）后都会调用, 预定义返回消息格式为${API_NAME}:ok / fail
        console.log(res.errMsg);
      }
    });
  },
})