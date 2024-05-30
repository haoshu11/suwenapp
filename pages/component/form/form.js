Page({
  data: {
    pickerHidden: true,
    chosen: ''
  },
  pickerConfirm(e) {
    this.setData({
      pickerHidden: true
    });
    this.setData({
      chosen: e.detail.value
    });
  },
  pickerCancel(e) {
    this.setData({
      pickerHidden: true
    });
  },
  pickerShow(e) {
    this.setData({
      pickerHidden: false
    });
  },
  formSubmit(e) {
    console.log('Form detail: ', e.detail.value);
    tt.showToast({
      title: '提交表格',
      icon: 'success'
    });
  },
  formReset(e) {
    this.setData({
      chosen: ''
    });
  }
});