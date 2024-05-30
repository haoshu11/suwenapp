Page({
  data: {
    extConfig: ''
  },
  getExtConfigSync() {
    try {
      let res = tt.getExtConfigSync();
      console.log('获取成功', res);
      if (res.extConfig) {
        this.setData({
          extConfig: JSON.stringify(res.extConfig)
        })
      }
    } catch (err) {
      console.log('执行出错', err);
    }
  }
})