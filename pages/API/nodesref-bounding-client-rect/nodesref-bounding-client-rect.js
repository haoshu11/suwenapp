Page({
  data: {
    nodes: {},
    exec: false
  },
  getNodeInfo() {
    if (this.data.exec) {
      this.setData({
        nodes: {},
        exec: !this.data.exec
      })
    } else {
      const query = tt.createSelectorQuery();
      query.select("#btn").boundingClientRect();
      query.exec(res => {
        console.log(res);
        res[0].dataset = JSON.stringify(res[0].dataset);
        this.setData({
          nodes: res[0],
          exec: !this.data.exec
        })
      });
    }
  }
})