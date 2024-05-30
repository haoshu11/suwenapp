const INTERVAL = 3000;

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
      id: 0,
      logList: []
    },
    setTimeout() {
      this.setLogContent({ content: "开始执行" });
      const id = setTimeout(() => {
        this.setLogContent({ content: "执行成功" });
      }, INTERVAL);
      this.setData({
        id
      });
    },
    clearTimeout() {
      clearTimeout(this.data.id);
      this.setData({
        id: 0
      });
      this.setLogContent({ content: "清除成功" });
    },
    setLogContent({ content = "" }, callback) {
      const logItem = {
        date: formatCurrentDate(),
        content
      };
      const { logList } = this.data;
      this.setData({
        logList: [logItem, ...logList]
      }, callback);
    }
  });