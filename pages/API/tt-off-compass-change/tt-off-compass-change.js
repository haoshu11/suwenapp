Page({
  data: {
    direction: 0
  },

  onCompassChange() {
    const that = this;
    tt.onCompassChange(function (res) {
      that.setData({
        direction: parseInt(res.direction, 10)
      });
    });
  },

  offCompassChange() {
    tt.offCompassChange();
  },

});