Page({
    data: {
        phoneNumber: '',
        content: '',
    },
    handlePhoneNumberInput: function (e) {
        this.setData({
            phoneNumber: e.detail.value
        });
    },
    handleContentInput: function (e) {
        this.setData({
            content: e.detail.value
        });
    },
    sendSms: function () {
        const { phoneNumber,
            content } = this.data;
        tt.sendSms({
            phoneNumber: phoneNumber || undefined,
            content: content || undefined,
            success: res => {
                console.log('success', res);
            },
            fail: err => {
                console.log('fail', err);
                tt.showToast({
                    title: '调起失败，请进入日志寻找原因',
                  });
            }
        })
    }
});