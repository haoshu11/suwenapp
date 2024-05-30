Page({
  toIndexTab() {
    tt.showModal({
      title: "跳转到 tabBar 页面",
      content: "跳转到 tabBar 页面会关闭此页面，无法返回，是否确定跳转？",
      success(res) {
        console.log("用户点击了" + (res.confirm ? "确定" : "取消"));
        if(res.confirm){
          tt.switchTab({
            url: '/pages/API/index',
            success(res) {
              console.log('success执行了', res);
            },
            fail(err) {
              console.log('fail执行了', err);
            },
            complete(res) {
              console.log('complete执行了', res);
            }
          });
        }
      },
      fail(err) {
        console.log(`showModal 调用失败`, err);
      },
    });
  }
})