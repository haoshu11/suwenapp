let socketTask;
Page({
  data: {
    socketStatus: ''
  },
  createSocket() {
    const socketStatus = this.data.socketStatus;
    if (socketTask && socketStatus === 'open') return;
    if (socketTask && socketStatus && socketStatus !== 'open') socketTask.close({ code: 1001 });
    const url = 'wss://frontier.snssdk.com/ws/v2?aid=1288&device_id=98543534&fpid=72&access_key=f075e82cde98601fc5d41302af325631';
    socketTask = tt.connectSocket({
      url,
      protocols: [],
      success: (res) => {
        console.log('创建成功', res, socketTask);
        tt.showModal({
          title: '创建成功',
          content: JSON.stringify({ ...res, ...socketTask, }),
        });
      },
      fail: (res) => {
        console.log('创建失败', res);
        tt.showModal({
          title: '创建失败',
          content: JSON.stringify(res),
        });
      },
    })
    socketTask.onOpen(() => {
      console.log('WebSocket 已连接');
      this.setData({
        socketStatus: 'open'
      })
    });

    socketTask.onClose(() => {
      console.log('WebSocket 已断开');
      this.setData({
        socketStatus: 'close'
      })
    });
    socketTask.onError((error) => {
      console.error('WebSocket 发生错误:', error);
      this.msg('socket发生错误');
      this.setData({
        socketStatus: 'error'
      });
    });
    socketTask.onMessage((message) => {
      console.log('socket message:', message);
    });
  },
  sendMessage() {
    if (!socketTask || this.data.socketStatus !== 'open') {
      this.msg('socket未创建或者创建失败');
      return;
    }
    const data = 'hello socket';
    socketTask.send({
      data,
      success: (res) => {
        tt.showModal({
          title: '发送成功',
          content: `send success, ${JSON.stringify(res)}`
        });
      },
      fail: (res) => {
        tt.showModal({
          title: '发送失败',
          content: `send error ${JSON.stringify(res)}`
        });
      },
    });
  },
  closeSocket() {
    socketTask.close({
      code: 1000,
      reason: '关闭',
      success: res => {
        console.log('close socket success', res);
        tt.showToast({
          title: 'close socket success',
          content: JSON.stringify(res),
        });
        this.setData({
          socketStatus: 'close'
        })
      },
      fail: err => {
        console.log('close socket err', err);
      }
    });
  },
  msg(msg) {
    tt.showToast({
      title: msg,
      icon: 'none'
    });
  },
})