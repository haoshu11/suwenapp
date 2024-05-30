Page({
  data: {
    acc: {},
  },

  onChange() {
    const that = this;
    tt.onAccelerometerChange(function (res) {
      that.setData({
        acc: res,
      });
    });
  },

  offChange() {
    tt.offAccelerometerChange();
  },

  clear() {
    this.setData({
      acc: {},
    });
  },
});
