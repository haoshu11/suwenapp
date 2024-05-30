const INTERVAL = 1000;

function isAddZero(num) {
  return Number(num) >= 10 ? `${num}` : `0${num}`;
}

function formatCurrentDate(timestamp = new Date().getTime()) {
  const year = new Date(timestamp).getFullYear();
  const month = isAddZero(new Date(timestamp).getMonth() + 1);
  const date = isAddZero(new Date(timestamp).getDate());
  const hour = isAddZero(new Date(timestamp).getHours());
  const minute = isAddZero(new Date(timestamp).getMinutes());
  const second = isAddZero(new Date(timestamp).getSeconds());

  return `${year}年${month}月${date}日 ${hour}:${minute}:${second}`;
}

Page({
    data: {
      // 当前的定时器 id
      id: 0,
      // 回调函数调用日志列表
      logList: [],
      // 定时器的调用次数
      invokedTime: 0
    },

    setInterval() {
      this.setLogContent({ content: "设置成功" });
      const id = setInterval(() => {
        this.setLogContent({ content: "回调函数执行" });
      }, INTERVAL);
      this.setData({
        id
      });
    },
  
    clearInterval() {
      clearInterval(this.data.id);
      this.setData({
        id: 0,
        invokedTime: 0
      });
      this.setLogContent({ content: "清除成功" });
    },

    setLogContent({ content = "" }, callback) {
      const { invokedTime } = this.data;
      if (invokedTime >= 10) {
        tt.showModal({
          title: '提示',
          content: '定时器内的回调函数最大调用次数为 10 次，到达 10 次后自动清除定时器',
        });
        this.clearInterval();
      } else {
        const logItem = {
          date: formatCurrentDate(),
          content
        };
        const { logList } = this.data;
        this.setData({
          logList: [logItem, ...logList],
          invokedTime: invokedTime + 1
        }, callback);
      }
    }
  
  });