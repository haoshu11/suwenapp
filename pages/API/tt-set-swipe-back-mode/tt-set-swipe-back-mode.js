Page({
  disableSwipe() {
    this.navigateToOperatePage(0);
  },
  enableSwipe() {
    this.navigateToOperatePage(1);
  },
  enableEdgeSwipe() {
    this.navigateToOperatePage(2);
  },
  // tt.setSwipeBackMode() 设置完成后，跳转到操作页面
  navigateToOperatePage(mode) {
    tt.navigateTo({
      url: `/pages/API/pg_tt-set-swipe-back-mode/pg_tt-set-swipe-back-mode?mode=${mode}`,
    });
  }
})