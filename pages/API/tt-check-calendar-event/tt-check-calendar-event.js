Page({
  data: {
    title: undefined,
    startTimeDate: undefined,
    startTimeTime: undefined,
    endTimeDate: undefined,
    endTimeTime: undefined,
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
  checkCalendar: function () {
    const { title,
      startTimeDate,
      startTimeTime,
      endTimeDate,
      endTimeTime, } = this.data;
      console.log(this.data);
    const startTime = new Date(`${startTimeDate}T${startTimeTime}`).getTime() / 1000;
    const endTime = endTimeDate && endTimeTime ? new Date(`${endTimeDate}T${endTimeTime}`).getTime() / 1000 : undefined;
    
    tt.checkCalendarEvent({
      title,
      startTime,
      endTime,
      success: res => {
        console.log('success', res);
        tt.showToast({
          title: '调用成功',
        });
        this.setData({
          result: `是否有事件：${res.isExist} \n是否有提醒：${res.hasAlarm}`,
        })
      },
      fail: err => {
        console.log('fail', err);
        tt.showToast({
          title: '调用失败',
        });
        this.setData({
          result: err.errMsg,
        })
      }
    })
  }
})