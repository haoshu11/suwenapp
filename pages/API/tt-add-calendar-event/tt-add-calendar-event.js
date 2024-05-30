Page({
    data: {
        title: undefined,
        startTimeDate: undefined,
        startTimeTime: undefined,
        endTimeDate: undefined,
        endTimeTime: undefined,
        description: undefined,
        location: undefined,
        alarm: undefined,
        repeatInterval: undefined,
        repeatStep: undefined,
        repeatEndTimeDate: undefined,
        repeatEndTimeTime: undefined,
        alarmOffset: undefined,
        result: '',
    },
    handleTitleInput: function (e) {
        this.setData({
            title: e.detail.value
        });
    },
    bingStartTimeDateChange: function (e) {
        this.setData({
            startTimeDate: e.detail.value
        });
    },
    bingStartTimeTimeChange: function (e) {
        this.setData({
            startTimeTime: e.detail.value
        });
    },
    bingEndTimeDateChange: function (e) {
        this.setData({
            endTimeDate: e.detail.value
        });
    },
    bingEndTimeTimeChange: function (e) {
        this.setData({
            endTimeTime: e.detail.value
        });
    },
    handleDescInput: function (e) {
        this.setData({
            description: e.detail.value
        });
    },
    handleLocationInput: function (e) {
        this.setData({
            location: e.detail.value
        });
    },
    alarmChange: function (e) {
        this.setData({
            alarm: e.detail.value
        });
    },
    repeatIntervalChange: function (e) {
        this.setData({
            repeatInterval: e.detail.value
        });
    },
    handleRepeatStepInput: function (e) {
        this.setData({
            repeatStep: e.detail.value
        });
    },
    bingRepeatEndTimeDateChange: function (e) {
        this.setData({
            repeatEndTimeDate: e.detail.value
        });
    },
    bingRepeatEndTimeTimeChange: function (e) {
        this.setData({
            repeatEndTimeTime: e.detail.value
        });
    },
    handleAlarmOffsetInput: function (e) {
        this.setData({
            alarmOffset: e.detail.value
        });
    },
    addCalendar: function () {
        const { title,
            startTimeDate,
            startTimeTime,
            endTimeDate,
            endTimeTime,
            description,
            location,
            alarm,
            repeatInterval,
            repeatStep,
            repeatEndTimeDate,
            repeatEndTimeTime,
            alarmOffset } = this.data;
        const startTime = new Date(`${startTimeDate}T${startTimeTime}`).getTime() / 1000;
        const endTime = endTimeDate && endTimeTime ? new Date(`${endTimeDate}T${endTimeTime}`).getTime() / 1000 : undefined;
        const repeatEndTime =repeatEndTimeDate && repeatEndTimeTime ? new Date(`${repeatEndTimeDate}T${repeatEndTimeTime}`).getTime() / 1000 : undefined;
        tt.addCalendarEvent({
            title,
            startTime,
            endTime,
            description,
            location,
            alarm: alarm === 'true',
            repeatInterval,
            repeatStep,
            repeatEndTime,
            alarmOffset: Number(alarmOffset),
            success: res => {
                console.log('success', res);
                tt.showToast({
                    title: '添加成功',
                  });
                  this.setData({
                    result: '添加成功',
                  })
            },
            fail: err => {
                console.log('fail', err);
                tt.showToast({
                    title: '添加失败，请进入日志寻找原因',
                  });
                  this.setData({
                    result: err.errMsg,
                  })
            }
        })
    }
});