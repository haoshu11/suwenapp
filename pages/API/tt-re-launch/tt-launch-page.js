Page({
  data: {
    length: 0
  },
  async onLoad() {
    tt.setNavigationBarTitle({ title: '通过reLaunch进入' });
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
  backReLaunch() {
    tt.reLaunch({
      url: 'tt-re-launch',
    });
  }  
})