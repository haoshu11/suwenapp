Page({
  data: {
    key: '',
    value: '',
    storageKeys: '',
    currentSize: '',
    limitSize: ''
  },

  onShow() {
    this.showStorageInfo();
  },

  keyChange(e) {
    this.setData({
      key: e.detail.value
    });
  },

  valueChange(e) {
    this.setData({
      value: e.detail.value
    });
  },

  setStorage() {
    let { key, value } = this.data;

    if (key === '') {
      return tt.showToast({
        title: 'key 不能为空',
        icon: 'fail'
      });
    }

    tt.setStorageSync(key, value);
    return tt.showToast({
      title: '数据保存成功',
      success: () => {
        this.setData({
          key: '',
          value: ''
        });
      }
    });

  },

  clearStorage() {
    try {
      return tt.showModal({
        title: '提示',
        content: '你确定要清空数据吗?',
        success: (res) => {
          if (res.confirm) {
            tt.clearStorageSync();
            this.setData({
              key: '',
              value: ''
            });
            this.showStorageInfo();
          }
        }
      });
    } catch (error) {}
  },

  showStorageInfo() {
    let storageInfo = tt.getStorageInfoSync();
    const {keys,limitSize,currentSize} = storageInfo;
    this.setData({
      storageKeys: JSON.stringify(keys),
      limitSize,
      currentSize
    });
  }

});