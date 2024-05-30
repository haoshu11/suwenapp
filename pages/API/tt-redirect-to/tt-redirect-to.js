Page({
  data: {
    length: 0
  },
  async onLoad(option) {
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
    tt.redirectTo({
      url: 'tt-redirect-page?params=redirectTo',
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
})