Page({
  canIPut(e) {
    const { data } = e.target.dataset;
    if (!data) {
      return;
    }

    const canIPut = tt.canIPutStuffOverComponent(data);
    if (canIPut) {
      tt.showModal({
        content: `可以在 ${data} 组件上放置元素`,
        showCancel: false,
        cancelColor: "#f00",
        confirmText: "确定"
      });
    } else {
      tt.showModal({
        content: `不可以在 ${data} 组件上放置元素`,
        showCancel: false,
        cancelColor: "#f00",
        confirmText: "确定"
      });
    }
  }
});