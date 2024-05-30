Page({
  data: {
    key: '',
    value: '',
    storageKey: '',
    storageValue: '',
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
    try {
      tt.setStorageSync(key, value);
      tt.showToast({
        title: '数据保存成功',
        success: () => {
          this.setData({
            key: '',
            value: ''
          })
        }
      }); 
      this.showStorage(key);
    } catch (error) {
      console.log(`setStorageSync调用失败`);
    }
  },

  showStorage(key) {
    tt.getStorage({
      key,
      success: (res) => {
        this.setData({
          storageKey: key,
          storageValue: res.data
        });
      },
      fail: (err) => {
        console.log('获取缓存失败: ', err);
        this.setData({
          storageKey: '',
          storageValue: ''
        });
      }
    })
  }
});