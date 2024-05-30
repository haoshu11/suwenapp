// pages/API/tt-request-subscribe-message/tt-request-subscribe-message.js
Page({
  subscribeMessage() {
    // 这里填写 能力-互动能力-消息管理-订阅消息 中的模版消息id
    const updateMsgTplId = 'MSG164161657291480498528979256';
    const orderSuccessTplId = 'MSG164158927218123174309792040';

    tt.requestSubscribeMessage({
      // 开放平台申请的模版id  支持最多3个同类型模版
      tmplIds: [updateMsgTplId, orderSuccessTplId],
      success(res) {
        console.log("订阅成功: ", res);
        //订阅成功回调
        let msg1 = "";
        let and = "";
        let msg2 = "";
        console.log("更新提醒通知: " + res[updateMsgTplId]);
        console.log("下单成功通知: " + res[orderSuccessTplId]);
        msg1 = res[updateMsgTplId] === "accept" ? "更新提醒通知" : "";
        msg2 = res[orderSuccessTplId] === "accept" ? "下单成功通知" : "";
        and = msg1 && msg2 && "及";
        tt.showModal({
          content: `${msg1}${and}${msg2} 订阅成功`,
          showCancel: false
        })
      },
      fail(res) {
        //订阅失败回调
        console.log("订阅失败,错误码: ", res.errNo);
        tt.showModal({
          title: "订阅失败",
          content: `errNo: ${res.errNo || "暂时未加"}`,
          showCancel: false
        });
      },
      complete(res) {
        //完成回调
        console.log("API调用完成: " + res.errMsg);
      },
    });
  }
})