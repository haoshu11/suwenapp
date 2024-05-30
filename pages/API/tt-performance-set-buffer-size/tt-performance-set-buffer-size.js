Page({
  data: {
    pageNumber: 20,
  },

  setBufferSize() {
    this.setData({ pageNumber: 30 });
    const res = tt.performance.setBufferSize(30);
  },
});
