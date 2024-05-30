/** @description Ad(广告)组件的状态 */
const AdStatus = {
  Load: '广告加载完成了',
  Error: '广告加载出错了',
  Close: '广告关闭了',
};

/** @description 错误信息映射 */
const ErrorMsgMap = {
  1000: {
    msg: '后端错误调用失败',
    desc: '该项错误不是开发者的异常情况',
  },
  1001: {
    msg: '参数错误',
    desc: '使用方法错误',
  },
  1002: {
    msg: '广告单元无效',
    desc: '可能是拼写错误、或者误用了其他 APP 的广告 ID',
  },
  1003: {
    msg: '内部错误',
    desc: '该项错误不是开发者的异常情况',
  },
  1004: {
    msg: '无适合的广告',
    desc: '广告不是每一次都会出现，这次没有出现可能是由于该用户不适合浏览广告',
  },
  1005: {
    msg: '广告组件审核中',
    desc: '广告正在被审核，无法展现广告',
  },
  1006: {
    msg: '广告组件被驳回',
    desc: '广告审核失败，无法展现广告',
  },
  1007: {
    msg: '广告能力被禁用',
    desc: '广告能力已经被封禁，封禁期间无法展现广告',
  },
  1008: {
    msg: '广告单元已关闭',
    desc: '该广告位的广告能力已经被关闭',
  },
};

Page({
  data: {
    unitId: 'b754ef8rp9f1bdd61a',
    adIntervals: 31,
    fixed: false,
    type: 'banner',
    scale: 100,
  },
  /** 广告加载成功的回调方法 */
  bindload(e) {
    console.log(AdStatus.Load, e);
    tt.showToast({
      title: AdStatus.Load,
      complete: true,
      icon: 'success',
      duration: 2000,
    });
  },
  /** 广告加载失败的回调方法 */
  binderror(e) {
    console.error(AdStatus.Error, e);

    const { errorCode } = e.detail;
    tt.showToast({
      title: `${ AdStatus.Error }, ${ ErrorMsgMap[errorCode] }`,
      complete: true,
      icon: 'fail',
      duration: 2000,
    });
  },
  /* 广告关闭的回调方法 */
  bindclose(e) {
    console.log(AdStatus.Close, e);

    tt.showToast({
      title: AdStatus.Close,
      complete: true,
      icon: 'none',
      duration: 2000,
    });
  },
  bindChangeAdIntervals(e) {
    const { value } = e.detail;
    const adIntervals = Number(value);

    if (adIntervals < 30) {
      tt.showToast({
        title: '设置的广告间隔时间不小于30s',
        duration: 1500,
        icon: 'none',
      });
      return;
    }

    this.setData({
      adIntervals
    });
  }
});
