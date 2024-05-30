const iconPath1 = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/5170eh7ulognuhog/tma-demo/imgs/set-loc-marker-icon1.png';
const iconPath2 = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/5170eh7ulognuhog/tma-demo/imgs/set-loc-marker-icon2.png';

Page({
  onReady(e) {
    this.mapCtx = tt.createMapContext("myMap");
  },
  moveToLocation() {
    this.mapCtx.moveToLocation();
  },
  setLocMarkerIcon1() {
    this.mapCtx.setLocMarkerIcon({
      iconPath: iconPath1,
      success(res) {
        console.log('设置定位点图标成功', res);
        tt.showToast({
          title: '设置成功',
        })
      },
      fail(err) {
        console.log('设置定位点图标失败', err);
        tt.showToast({
          title: '设置失败',
          icon: 'none'
        })
      },
      complete(res) {
        console.log('接口已调用（调用成功、失败都会执行）', res);
      },
    });
  },
  setLocMarkerIcon2() {
    this.mapCtx.setLocMarkerIcon({
      iconPath: iconPath2,
      success(res) {
        console.log('设置定位点图标成功', res);
        tt.showToast({
          title: '设置成功',
        })
      },
      fail(err) {
        console.log('设置定位点图标失败', err);
        tt.showToast({
          title: '设置失败',
          icon: 'none'
        })
      },
      complete(res) {
        console.log('接口已调用（调用成功、失败都会执行）', res);
      },
    });
  },
})