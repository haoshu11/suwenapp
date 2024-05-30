let canvas, canvasCtx;

function getNodeInfos(node) {
  return Object.entries(node)
    .filter(([key, value]) => typeof value !== 'function')
    .map(([key, value]) => `${key} : ${value}`);
}

Page({
  data: {
    nodeTitle: "获取方式：",
    nodeInfo: [
      "width : ",
      "height : ",
      "isCanvas : ",
      "id : ",
      "type : ",
      "uniqCanvasId : ",
      "_width : ",
      "_height : ",
      "_top : ",
      "_left : ",
    ]
  },
  onLoad: function (options) {
    const query = tt.createSelectorQuery();
    query
      .select("#myCanvas")
      .fields({
        node: true,
      })
      .exec((res) => {
        canvas = res[0].node;
        canvasCtx = canvas.getContext("2d");
        canvasCtx.font = "20px Georgia";
        canvasCtx.fillStyle = "red";
        canvasCtx.fillText("我是一个canvas", 0, 50);
      });
  },
  getCanvas(e) {
    const { type } = e.target.dataset;
    switch (type) {
      case 'fields':
        this.getCanvasByFields();
        break;
      case 'node':
        this.getCanvasByNode();
        break;
      default:
        break;
    }
  },
  getCanvasByFields() {
    const that = this;
    tt.createSelectorQuery()
      .select("#myCanvas") // canvas 组件的id
      .fields(
        {
          node: true, // 若获取canvas 实例，必须指定 node 为true
        },
        function (res) {
          const canvas = res.node; // canvas 实例
        }
      )
      .exec((res) => {
        console.log("获取方式：NodeRef.fields", res[0].node)
        that.setData({
          nodeTitle: "获取方式：NodeRef.fields",
          nodeInfo: getNodeInfos(res[0].node)
        })
      });
  },
  getCanvasByNode() {
    const that = this;
    tt.createSelectorQuery()
      .select("#myCanvas")  // canvas 组件的id
      .node()
      .exec((res) => {
        console.log("获取方式：NodeRef.node", res[0].node)
        that.setData({
          nodeTitle: "获取方式：NodeRef.node",
          nodeInfo: getNodeInfos(res[0].node)
        })
      })
  },

  clearInfos() {
    this.setData({
      nodeTitle: "获取方式：",
      nodeInfo: [
        "width : ",
        "height : ",
        "isCanvas : ",
        "id : ",
        "type : ",
        "uniqCanvasId : ",
        "_width : ",
        "_height : ",
        "_top : ",
        "_left : ",
      ]
    });
  }
})