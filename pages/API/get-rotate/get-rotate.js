Page({
  data: {
    rotate: 0
  },
  onReady() {
    this.mapCtx = tt.createMapContext("myMap");
  },
  getRotate() {
    this.mapCtx.getRotate({
      success(res) {
        console.log('获取旋转角成功：', res);
        tt.showToast({
          title: `地图旋转角: ${parseInt(res.rotate)}`
        });
      },
      fail(res){
        console.log("获取旋转角失败: ", res.errMsg);
      },
      complete(res){
        console.log("接口已调用（调用成功、失败都会执行）: ", res.errMsg);
      }
    });
  },
  setRotate(e) {
    const { value: rotate } = e.detail;

    this.setData({
      rotate
    });
  }
});