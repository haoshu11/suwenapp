const pageData = {
  data: {
    value: "10"
  },
  onShareAppMessage() {
    return {
      title: 'slider',
      path: 'page/component/pages/slider/slider'
    };
  },
  bindchanging(e) {
    console.log('拖动过程中触发的事件', e);
  }
};
for (let i = 1; i < 5; ++i) {
  (function (index) {
    pageData['slider' + index + 'change'] = function (e) {
      console.log('slider' + index + '发生change事件，携带值为', e.detail.value);
      tt.showToast({
        title: `当前 value为 ${e.detail.value}`,
      });
    };
  })(i);
}
Page(pageData);