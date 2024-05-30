Page({
  data: {
    length: 0
  },
  async onLoad(){
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
  onItemClick() {
    tt.navigateTo({
      url: `tt-navigate-page?params=navigateTo`, //demo示例，一般路径形式：/pages/detail/detail?key=${value}
      success(res) {
        console.log(res);
      },
      fail(res) {
        console.log("navigateTo调用失败");
      },
    });
  },
})