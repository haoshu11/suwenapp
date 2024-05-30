const login = () => {
  return new Promise((resolve, reject) => {
    tt.login({
      force: true,
      success: function (res) {
        console.log('login成功, code:::: ',res.code);
        if (res.code) {
          resolve({
            hasLogin: true,
            code: res.code,
          });
        } else {
          reject({
            hasLogin: false,
          });
        }
      },
      fail: function (err) {
        reject({
          hasLogin: false,
        });
      }
    });
  });
};


Page({
  data: {
    encryptData: '',
  },
  onLoad(){
    this.getSessionKey().then((sessionKey) => {
      this.sessionKey = sessionKey;
    });
  },
  // NOTE: 这个是老的逻辑，为了给开发者展示一个推荐使用方法，只是这个 url 现在挂了，所以就先用下面的方法代替，如果之后有额外的展示需求再考虑要不要替换一个 url
  // getPhoneNumber(e) {
  //   tt.request({
  //     url: "https://ghrp2gxy.fn.bytedance.net",
  //     method: "POST",
  //     data: {
  //       encryptedData: e.detail.encryptedData,
  //       iv: e.detail.iv,
  //       session_key: this.sessionKey,
  //     },
  //     success: (res) => {
  //       const userInfo = JSON.parse(res.data);
  //       tt.showModal({
  //         title: "用户当前的手机号为",
  //         content: userInfo.phoneNumber,
  //       });
  //     },
  //     fail(err){
  //       console.log("解密手机号请求失败: ",err)
  //     }
  //   });
  // },

  getPhoneNumberHandler(e) {
    console.log("获取手机号的加密数据成功,开发者可以把该数据传回到自己的服务端进行解密获取手机号,加密数据为: ",e)
    if (e.detail.errMsg.slice(-2) === "ok") {
      this.setData({
        encryptData: JSON.stringify(e.detail)
      });
      tt.showToast({
        title: 'success'
      });
    }else {
      this.setData({
        encryptData: e.detail.errMsg
      });
      tt.showToast({
        title: 'failed',
        icon: "none"
      });
    }
  },

  getSessionKey() {
    return login().then(
      ({ code }) =>
        new Promise((resolve, reject) => {
          tt.request({
            url: `https://microapp.bytedance.com/miniprogram-demo/invoke/tma_demo_code2session?code=${code}`,
            success: (res) => {
              resolve(res.data.session_key);
            },
            fail(err) {
              reject(err)
            }
          });
        })
    );
  },
});
