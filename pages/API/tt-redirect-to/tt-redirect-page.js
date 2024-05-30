Page({
  data: {
    length: 0
  },
  async onLoad(option) {
    console.log("上一个页面传来的参数为："+ option.params)
    tt.setNavigationBarTitle({ title: '通过redirectTo进入' });
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
  backRedirectTo(){
    tt.redirectTo({
      url: 'tt-redirect-to',
    });
  }
})