Page({
  data: {
    skew: 0
  },
  onReady() {
    this.mapCtx = tt.createMapContext("myMap");
  },
  getSkew() {
    this.mapCtx.getSkew({
      success(res) {
        console.log('获取倾斜角成功：', res);
        
        tt.showToast({
          title: `地图倾斜角: ${parseInt(res.skew)}`
        });
      },
      fail(res){
        console.log("获取倾斜角失败: ", res.errMsg);
      },
      complete(res){
        console.log("接口已调用（调用成功、失败都会执行）: ", res.errMsg);
      }
    });
  },
  setSkew(e) {
    const { value: skew } = e.detail;

    this.setData({
      skew
    });
  }
});