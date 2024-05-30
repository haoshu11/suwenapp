Page({
  data: {
    exec: false,
    nodes: {}
  },
  getNodeInfo() {
    if (this.data.exec) {
      this.setData({
        nodes: {},
        exec: !this.data.exec
      })
    } else {
      this.selectComponent('#myComponent', (res) => {
        if (res) {
          //将节点选取范围限定在 myComponent 中
          const query = tt.createSelectorQuery().in(res);
          // 选取节点，添加布局位置的查询请求
          query.select(".box").boundingClientRect();
          query.exec((res) => {
            console.log(res[0]);
            this.setData({
              nodes: res[0] || {},
              exec: !this.data.exec
            })
          });
        } else {
          tt.showToast({
            title: '获取组件信息失败',
            icon: 'none'
          });
        }

      })
    }
  }
})