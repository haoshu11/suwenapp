worker.onMessage((msg) => {
  // 监听主线程通过按钮的点击事件告知 Worker 线程发送消息的时机
  if (msg.from === 'worker' && msg.type === 'send') {
    worker.postMessage({
      from: 'worker',
      type: 'send',
      content: '消息' + msg.content,
    });
  }
  // 收到主线程主动发送给 Worker 线程的消息
  if (msg.from === 'main' && msg.type === 'send') {
    worker.postMessage({
      from: 'worker',
      type: 'receive',
      content: msg.content,
    });
  }
});
