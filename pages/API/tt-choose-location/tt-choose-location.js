Page({
  data: {
    addressInfo: undefined,
  },
  chooseLocation() {
    tt.chooseLocation({
      success: (res) => {
        this.setData({
          addressInfo: res
        })
        tt.showToast({
          title: '操作成功',
          icon: 'success'
        });
      },
      fail: () => {
        tt.showToast({
          title: '操作失败',
          icon: 'fail'
        });
      },
      complete: (res) => {
        console.log("chooseLocation complete");
      }
    });
  },
})