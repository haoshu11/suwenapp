Page({
  data: {
    isShow: false,
    isDisconnect: false
  },
  onReady() {
    this.connectIntersectionObserver();
  },
  handleSwitchConnectStatusBtnClick() {
    const { isDisconnect } = this.data;

    this.setData({
      isDisconnect: !isDisconnect,
    }, () => {
      const { isDisconnect } = this.data;
      if (isDisconnect) {
        this.disconnectIntersectionObserver();
      } else {
        this.connectIntersectionObserver();
      }
    });
  },
  connectIntersectionObserver() {
    this.intersectionObserver = tt.createIntersectionObserver(this, {
      thresholds: [0],
      initialRatio: 0,
      observeAll: false,
    });
    this.intersectionObserver.relativeTo("#sv");
    this.intersectionObserver.observe("#target", (res) => {
      // 利用相交比例和各种边界信息实现业务逻辑，例如：判断目标元素是否进入屏幕可视范围等等
      const { intersectionRatio } = res;
      if (intersectionRatio > 0) {
        // target 进入视线
        this.setData({
          isShow: true
        })
        tt.showToast({
          title: '显示',
          icon: 'none'
        });
      } else if (intersectionRatio === 0) {
        // target 离开视线
        this.setData({
          isShow: false
        })
        tt.showToast({
          title: '隐藏',
          icon: 'none'
        });
      }
    });
  },
  disconnectIntersectionObserver() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
  }
})
