let worker;
let mainSend = 1;
let workerSend = 1;
Page({
  data: {
    mainAllMsg: [],
    workerAllMsg: [],
    canIUse: tt.canIUse('createWorker'),
  },
  mainMsg: [],
  workerMsg: [],
  createWorker: function () {
    try {
      if (this.checkCanIUse()) {
        worker = tt.createWorker('pages/API/create-worker/workers/response.js');
        tt.showToast({
          title: '创建 Worker 线程成功',
        });
        this.handleMainMessage(worker);
      }
    } catch (err) {
      tt.showModal({
        title: '创建 Worker 线程失败',
        content: `错误信息: ${err.message}`,
        showCancel: false,
      });
    }
  },
  postMessage: function () {
    try {
      if (this.checkCanIUse()) {
        const message = {
          from: 'main',
          type: 'send',
          content: '消息' + mainSend,
        };
        worker.postMessage(message);
        this.mainMsg.push('发送' + message.content);
        mainSend++;
        this.setData({
          mainAllMsg: this.mainMsg,
        });
      }
    } catch (err) {
      tt.showModal({
        title: '主线程发送消息失败',
        content: `错误信息: ${err.message}`,
        showCancel: false,
      });
    }
  },
  // 此 demo 通过主线程按钮的点击事件告知 Worker 线程发送消息的时机
  workerPostMessage: function () {
    try {
      if (this.checkCanIUse()) {
        const message = {
          from: 'worker',
          type: 'send',
          content: workerSend,
        };
        worker.postMessage(message);
        workerSend++;
      }
    } catch (err) {
      tt.showModal({
        title: 'worker 线程发送消息失败',
        content: `错误信息: ${err.message}`,
        showCancel: false,
      });
    }
  },
  terminateWorker: function () {
    try {
      if (this.checkCanIUse()) {
        worker.terminate();
        // 清空现有数据
        this.mainMsg = [];
        this.workerMsg = [];
        mainSend = 1;
        workerSend = 1;
        this.setData({
          mainAllMsg: [],
          workerAllMsg: [],
        });
        tt.showToast({
          title: '销毁 Worker 线程成功',
        });
      }
    } catch (err) {
      tt.showModal({
        title: '销毁 Worker 线程失败',
        content: `错误信息: ${err.message}`,
        showCancel: false,
      });
    }
  },
  /*
   * 监听并处理主线程的消息
   * 因为 Worker 线程具有独立的上下文，并且不支持 tt 系列 API，此 demo 中的 Worker 线程收到消息后会把消息发送给主线程进行交互展示
   */
  handleMainMessage: function (worker) {
    worker.onMessage((message) => {
      // 主线程监听到 Worker 发送的消息
      if (message.from === 'worker' && message.type === 'send') {
        this.mainMsg.push('收到' + message.content);
        this.workerMsg.push('发送' + message.content);
      }
      // Worker 线程监听到主线程发送的消息
      if (message.from === 'worker' && message.type === 'receive') {
        this.workerMsg.push('收到' + message.content);
      }
      this.setData({
        mainAllMsg: this.mainMsg,
        workerAllMsg: this.workerMsg,
      });
    });
  },
  // 版本兼容，低版本需要升级后使用 Worker 能力
  checkCanIUse: function () {
    if (this.data.canIUse) {
      return true;
    } else {
      tt.showModal({
        title: '提示',
        content:
          '当前基础库版本过低，无法使用该功能，请升级基础库版本至 2.78.0 及以上。',
        showCancel: false,
      });
      return false;
    }
  },
});
