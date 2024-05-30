Page({
  data: {
    isFocus: true,
  },

  onLoad() {
  },

  handleInput(e) {
    console.log("input", e.detail);
    this.setData({
      value: e.detail.value
    })
  },
  handleFocus(e) {
    console.log("focus", e.detail);

    tt.showToast({
      title: 'focus',
      duration: 1500,
      icon: 'none',
      mask: false,
    });
  },
  handleBlur(e) {
    console.log("blur", e.detail);

    tt.showToast({
      title: 'blur',
      duration: 1500,
      icon: 'none',
      mask: false,
    });
  },
  handleConfirm(e) {
    console.log("confirm", e.detail);

    tt.showModal({
      title: 'confirm',
      content: e.detail.value,
    });
  },
  handleLineChange(e) {
    console.log("linechange", e.detail);

    tt.showToast({
      title: 'linechange',
      duration: 1500,
      icon: 'none',
      mask: false,
    });
  },

  handleSwitchFocus(e) {
    this.setData({
      isFocus: true,
    }, () => {
      tt.showToast({
        title: 'focus',
        duration: 1500,
        icon: 'none',
        mask: false,
      });
    });
  },

  handleSwitchBlur() {
    this.setData({
      isFocus: false,
    }, () => {
      tt.showToast({
        title: 'blur',
        duration: 1500,
        icon: 'none',
        mask: false,
      });
    });
  }
});