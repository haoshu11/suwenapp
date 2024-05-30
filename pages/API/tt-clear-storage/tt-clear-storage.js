Page({
  data: {
    storageKeys: '',
    currentSize: '',
    limitSize: ''
  },

  onLoad(){
    this.setStorage();
    this.showStorageInfo();
  },

  setStorage(){
    tt.setStorageSync("_name","kobe");
    tt.setStorageSync("_age","18");
    tt.setStorageSync("_gender","male");
  },

  clearStorage() {
    try {
      return tt.showModal({
        title: '提示',
        content: '你确定要清空数据吗?',
        success: (res) => {
          if (res.confirm) {
            tt.clearStorage({
              success: (res) => {
                console.log("clearStorage 调用成功");
                this.showStorageInfo()
              },
              fail: (res) => {
                console.log("clearStorage 调用失败");
              },
              complete: (res) => {
                console.log("clearStorage 接口调用了");
              }
            });
          }
        }
      });
    } catch (error) {}
  },

  showStorageInfo() {
    tt.getStorageInfo({
      success: (res) => {
        const { keys,limitSize,currentSize } = res;
        this.setData({
          storageKeys: JSON.stringify(keys),
          limitSize,
          currentSize
        });
      },
      fail: () => {
        tt.showToast({
          title: '已清除缓存，获取缓存信息失败。'
        });
      },
      complete: () => {
        console.log('已清除缓存，获取缓存信息回调。')
      } 
    })
  }

});