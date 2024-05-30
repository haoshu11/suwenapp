Page({
  updateManager() {
    var updateManager = tt.getUpdateManager();
    updateManager.onUpdateReady(res => {
      tt.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启小程序？',
        success: res => {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      });
    });
    updateManager.onUpdateFailed(err => {
      // 新的版本下载失败
      console.log('版本下载失败原因', err);
      tt.showToast({
        title: '新版本下载失败，请稍后再试',
        icon: 'none'
      });
    });
    updateManager.onCheckForUpdate(res => {
      if (!res.hasUpdate) {
        tt.showToast({
          title: '暂未检测到新版本',
          icon: 'none',
        });
      } else {
        tt.showToast({
          title: '检测到新版本',
          icon: 'none',
        });
      }

    })
  }
})