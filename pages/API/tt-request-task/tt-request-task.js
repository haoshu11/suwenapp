Page({
  data: {
    requestData: '',
    responseData: '',
    buttonDisabled: false,
  },
  /**
   * request请求
   */
  request() {
    this.setData({
      buttonDisabled: true
    }, () => {
      // demo测试接口
      const requestUrl = `https://microapp.bytedance.com/miniprogram-demo/invoke/tma_demo_request/`
      const options = {
        url: requestUrl, // 请求地址
        data: { // 请求的参数
          name: 'bytedance'
        },
        header: {
          'Content-Type': 'application/json',
        },
        method: 'POST',    // 指定对应的网络请求方法，详见文档中method枚举值
        dataType: 'json', // 指定返回数据的类型为 json。不填默认为json
        enableCache: false, // 是否开启 cache ，不填默认为false
        responseType: 'json', // 期望响应的数据类型
        timeout: 60000, // 超时时间，单位为毫秒（最大值 60000ms)
      }
      this.task = tt.request({
        ...options,
        success: (res) => { // 请求成功回调
          console.log('请求成功', res.data);
          tt.showToast({
            title: '请求成功，请在最下方查看详细数据',
            icon: 'none'
          });
          this.setData({
            requestData: JSON.stringify(options),
            responseData: JSON.stringify(res.data)
          })
        },
        fail: (res) => {// 请求失败回调
          console.log('请求失败', res.errMsg);
          tt.showToast({
            title: '请求失败，请在最下方查看详细数据',
            icon: 'none'
          });
          this.setData({
            requestData: JSON.stringify(options),
            responseData: JSON.stringify(res)
          })
        },
        complete: (res) => { // 请求结束回调
          console.log('调用接口结束', res.data)
          this.setData({ buttonDisabled: false });
        }
      });
    });
  },
  abort() {
    if (this.task) {
      this.task.abort();
      this.task = null;
      tt.showToast({
        title: '中断请求',
      });
      this.setData({
        responseData: '',
      });
    }
  }
});