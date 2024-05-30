Page({
  showOrHideShareMenu(menus) {
    const currentMenus = menus.currentTarget.dataset.menus.split(',');
    const type = menus.currentTarget.dataset.type
    if (type === 'show') {
      tt.showShareMenu({
        menus: currentMenus,
        success(res) {
          // 当 API 成功执行后调用，预定义返回消息格式为${API_NAME}:ok
          tt.showToast({
            title: '展示成功',
          });
          console.log(res.errMsg);
        },
        fail(res) {
          // 当 API 执行失败后调用, 预定义返回消息格式为${API_NAME}:fail
          tt.showToast({
            title: res.errMsg,
            icon: 'fail'
          });
          console.log(res.errMsg);
        },
        complete(res) {
          // 当 API 执行完成（无论成功或者失败）后都会调用, 预定义返回消息格式为${API_NAME}:ok / fail
          console.log(res.errMsg);
        }
      });
    } else {
      tt.hideShareMenu({
        menus: currentMenus,
        success(res) {
          tt.showToast({
            title: '隐藏成功',
          });
          // 当 API 成功执行后调用，预定义返回消息格式为${API_NAME}:ok
          console.log(res.errMsg);
        },
        fail(res) {
          // 当 API 执行失败后调用, 预定义返回消息格式为${API_NAME}:fail
          tt.showToast({
            title: res.errMsg,
            icon: 'fail'
          });
          console.log(res.errMsg);
        },
        complete(res) {
          // 当 API 执行完成（无论成功或者失败）后都会调用, 预定义返回消息格式为${API_NAME}:ok / fail
          console.log(res.errMsg);
        }
      });
    }

  },
})