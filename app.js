import { api, data, components } from './data.js';
App({
  onLaunch: function () {
    // 此处仅为效果展示，建议在app.js中的OnLaunch()中调用
    const updateManager = tt.getUpdateManager();

    updateManager.onUpdateReady(() => {
      tt.showToast({
        title: '新版本下载完成',
        icon: 'none',
      });
    });

    updateManager.onCheckForUpdate((res) => {
      tt.showToast({
        title: (res.hasUpdate ? '有' : '无') + '可用更新版本',
        icon: 'none',
      });
    });

    updateManager.onUpdateFailed((err) => {
      console.log('版本更新失败原因', err);
      tt.showToast({
        title: '版本更新失败，请重试',
        icon: 'none',
      });
    });

    console.log('App Launch');
  },
  onShow: function () {
    console.log('App Show');
  },
  onHide: function () {
    console.log('App Hide');
  },
  globalData: {
    imageUrl: 'https://sf3-ttcdn-tos.pstatp.com/obj/developer/ide/demo/',
    api, data, components
  }
});