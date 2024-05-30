Page({
  data: {
    nodes: {},
    scroll: false,
    scrollInfo: {},
    useComponent: false,
    fields: false,
    showAllInfo: false,
    paramsArr: ['No.', 'bottom', 'top', 'left', 'right', 'height', 'width'],
    btnFields: []
  },
  onLoad() {
    this.getNodes();
  },
  getScroll() {
    this.setData({
      scroll: !this.data.scroll,
    }, () => {
      this.setScrollTop();
    });
  },
  // 设置页面滚动高度
  setScrollTop() {
    tt.pageScrollTo({
      scrollTop: 400,
      duration: 1000,
      success: (res) => {
        console.log(`pageScrollTo调用成功`);
        this.getNodes();
      },
      fail(res) {
        console.log(`pageScrollTo调用失败`);
      },
    });
  },
  getNodes() {
    const query = tt.createSelectorQuery();
    query.select('.box').boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(res => {
      console.log('节点信息获取成功', res);
      this.setData({
        nodes: res[0] || {},
        scrollInfo: res[1] || {}
      })
    })
  },
  useComponent() {
    this.setData({
      useComponent: !this.data.useComponent
    });
  },
  getFields: function () {
    let that = this;
    let fields = !this.data.fields;
    this.setData({
      fields
    })
    if(fields){
      tt.createSelectorQuery()
      .select(".box")
      .fields({
          size: true,
        },
        function (res) {
          console.log('size', res);
          that.setData({
            nodes: res || {},
            scrollInfo: {}
          })
        },
      )
      .exec();
    }
    else{
      this.getNodes();
    } 
  },
  getAllInfo() {
    const that = this;
    const query = tt.createSelectorQuery();
    query.selectAll(".btn-area").boundingClientRect();
    query.exec(function (res) {
      console.log("所有相同类名节点信息", res[0]);
      const modalContent = that.processInfo(res[0]);
      that.setData({
        btnFields: modalContent,
        showAllInfo: true
      })
    });
  },
  cancelAllInfo() {
    this.setData({
      showAllInfo: false
    })
  },
  processInfo(res) {
    const modalContent = [];
    res.map((element, index) => {
      const content = [index + 1];
      this.data.paramsArr.map((p, idx) => {
        if (idx > 0) {
          content.push(parseInt(element[p]))
        }
      })
      modalContent.push(content)
    })
    return modalContent
  }
})
