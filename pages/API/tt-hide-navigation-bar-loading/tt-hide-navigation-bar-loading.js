Page({
  data: {
    isLoading: true,
  },
  onLoad() {
    tt.showNavigationBarLoading();
  },
  hideBarLoading() {
    tt.hideNavigationBarLoading({
      success(res) {
        tt.showToast({
          title: 'hideBarLoading',
          icon: 'none',
        });
        console.log('hideNavigationBarLoading success', res);
      },
      fail(err) {
        console.log('hideNavigationBarLoading fail', err);
      },
      complete(res) {
        console.log('hideNavigationBarLoading complete', res);
      }
    })
  },
  showBarLoading() {
    tt.showNavigationBarLoading({
      success(res) {
        tt.showToast({
          title: 'showBarLoading',
          icon: 'none',
        });
        console.log('showNavigationBarLoading success', res);
      },
      fail(err) {
        console.log('showNavigationBarLoading fail', err);
      },
      complete(res) {
        console.log('showNavigationBarLoading complete', res);
      }
    });
  },
  handleBtnClick() {
    this.setData({
      isLoading: !this.data.isLoading
    }, () => {
      const { isLoading } = this.data;
      isLoading ? this.showBarLoading() : this.hideBarLoading();
    });
  }
});