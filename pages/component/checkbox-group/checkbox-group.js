Page({
  data: {
    items: [{
      value: 'xigua',
      name: '西瓜视频'
    }, {
      value: 'toutiao',
      name: '今日头条',
      checked: 'true'
    }, {
      value: 'huoshan',
      name: '火山小视频'
    }, {
      value: 'douyin',
      name: '抖音',
      color: 1
    }, {
      value: 'flipgaram',
      name: 'Flipagram'
    }]
  },
  checkboxChange: function (e) {
    const items = this.data.items, values = e.detail.value;

    for (let i = 0; i < items.length; ++i) {
      items[i].checked = false;

      for (let j = 0; j < values.length; ++j) {
        if (items[i].value === values[j]) {
          items[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      items: items
    });
  }
});