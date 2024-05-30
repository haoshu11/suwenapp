Page({
  handleNavigateToSetSwipeBackModePage() {
    tt.navigateBack({});
  },
  onLoad(options) {
    const mode = Number(options.mode)
    if ([0, 1, 2].includes(mode)) {
      tt.setSwipeBackMode(mode);
    } else {
      tt.showToast({
        title: 'Code error'
      });
    }
  }
})