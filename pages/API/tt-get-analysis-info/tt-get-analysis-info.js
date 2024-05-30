Page({
  data: {
    analysisInfo: "",
    empty: true,
  },

  getAnalysisInfo() {
    const { empty } = this.data;
    if (empty) {
      tt.getAnalysisInfo({
        success: (info) => {
          this.setData({
            analysisInfo: JSON.stringify(info),
            empty: !this.data.empty,
          });
        },
        fail: () => {
          tt.showToast({
            title: "获取流量归因参数失败",
            icon: "fail",
          });
        },
      });
    } else {
      this.setData({
        analysisInfo: "",
        empty: !this.data.empty,
      });
    }
  },
});
