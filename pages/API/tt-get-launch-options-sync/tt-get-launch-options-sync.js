Page({
  data: {
    options: "",
    getParams: false
  },

  getLaunch() {
    if (!this.data.getParams) {
      const options = tt.getLaunchOptionsSync();
      this.setData({
        options: JSON.stringify(options),
        getParams: !this.data.getParams
      });
      console.log(options.path);
    } else {
      this.setData({
        options: "",
        getParams: !this.data.getParams
      });
    }
  }
});