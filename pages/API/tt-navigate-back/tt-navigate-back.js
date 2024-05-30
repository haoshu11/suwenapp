Page({
  data: {
    length: 0
  },
  async onLoad(options) {
    const pages = await this.getPages();
    this.setData({
      length: pages.length
    })
  },
  getPages() {
    return new Promise((resolve, reject) => {
      resolve(getCurrentPages());
    })
  },
  navigateBack() {
    tt.navigateBack({
      delta: 1,
      success(res) {
        console.log('success执行了', res);
      },
      fail(err) {
        console.log('fail执行了', err);
        tt.showModal({
          title:"返回上一页失败",
          content: "第一个页面不能 navigate back",
          showCancel:false
        });
      },
      complete(res) {
        console.log('complete执行了', res);
      }
    });
  },
  onItemClick() {
    tt.navigateTo({
      url: `tt-navigate-page?params=navigateBack`, //demo示例，一般路径形式：/pages/detail/detail?key=${value}
      success(res) {
        console.log(res);
      },
      fail(res) {
        console.log("navigateTo调用失败",res);
      },
    });
  },
})