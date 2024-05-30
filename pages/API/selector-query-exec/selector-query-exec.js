Page({
  data: {
    nodes: {},
    exec: false
  },
  onReady() {
    this.query = tt.createSelectorQuery();
    this.query.select("#btn").boundingClientRect();
  },
  getNodeInfo() {
    if (this.data.exec) {
      this.setData({
        nodes: {},
        exec: !this.data.exec
      })
    } else {
      this.query.exec(res => {
        console.log('width:', res[0].width, ' height:', res[0].height);
        this.setData({
          nodes: res[0],
          exec: !this.data.exec
        })
      });
    }
  }
})