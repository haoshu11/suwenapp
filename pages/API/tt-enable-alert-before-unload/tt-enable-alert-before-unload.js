Page({
  data: {
    length: 0
  },
  async onLoad() {
    const pages = await this.getPages();
    this.setData({
      length: pages.length
    })
  },
  getPages() {
    return new Promise((resolve) => {
      resolve(getCurrentPages());
    })
  },
  goNext() {
    tt.navigateTo({
      url: '/pages/API/tt-enable-alert-before-unload/tt-enable-alert-before-unload-page'
    });
  }
})