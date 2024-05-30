Page({
  data: {
    entries: [],
    performanceObserver: null,
  },

  onLoad() {
    // 调用 tt.performance.createObserver 创建监听回调
    const performanceObserver = tt.performance.createObserver((entryList) => {
      // 触发 callback 时将性能数据存储在 data 中
      this.setData({ entries: this.data.entries.concat(entryList) });
      console.log(this.data.entries);
    });
    // 订阅特定类型的性能节点的两种方式
    this.setData({ performanceObserver });
    performanceObserver.observe({
      entryTypes: ['paint', 'evaluate', 'navigation', 'resource', 'mark'],
    });
  },
  onShow() {
    tt.performance.mark('qqq');
  },
  disconnectObserver() {
    this.data.performanceObserver.disconnect();
  },
});
