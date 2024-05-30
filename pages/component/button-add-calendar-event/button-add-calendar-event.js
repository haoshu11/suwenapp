Page({
  data: {
    calendarParams: {
      title: undefined,
      startTime: undefined,
      endTime: undefined,
      desc: undefined,
      location: undefined,
      alarm: undefined,
      alarmOffset: undefined,
    },
    startTimeDate: undefined,
    startTimeTime: undefined,
    endTimeDate: undefined,
    endTimeTime: undefined,
    result: "",
  },
  handleTitleInput: function (e) {
    this.setData({
      ["calendarParams.title"]: e.detail.value,
    });
  },
  bingStartTimeDateChange: function (e) {
    const inputStartDate = e.detail.value;
    const inputStartTime = this.data.startTimeTime;
    const startTime =
      new Date(`${inputStartDate}T${inputStartTime}`).getTime() / 1000;
    console.log();
    this.setData({
      startTimeDate: inputStartDate,
      ["calendarParams.startTime"]: startTime,
    });
  },
  bingStartTimeTimeChange: function (e) {
    const inputStartDate = this.data.startTimeDate;
    const inputStartTime = e.detail.value;
    const startTime =
      new Date(`${inputStartDate}T${inputStartTime}`).getTime() / 1000;
    this.setData({
      startTimeTime: inputStartTime,
      ["calendarParams.startTime"]: startTime,
    });
  },
  bingEndTimeDateChange: function (e) {
    const inputEndDate = e.detail.value;
    const inputEndTime = this.data.endTimeTime;
    const endTime =
      new Date(`${inputEndDate}T${inputEndTime}`).getTime() / 1000;
    this.setData({
      endTimeDate: inputEndDate,
      ["calendarParams.endTime"]: endTime,
    });
  },
  bingEndTimeTimeChange: function (e) {
    const inputEndDate = this.data.endTimeDate;
    const inputEndTime = e.detail.value;
    const endTime =
      new Date(`${inputEndDate}T${inputEndTime}`).getTime() / 1000;
    this.setData({
      endTimeTime: inputEndTime,
      ["calendarParams.endTime"]: endTime,
    });
  },
  handleDescInput: function (e) {
    this.setData({
      ["calendarParams.description"]: e.detail.value,
    });
  },
  handleLocationInput: function (e) {
    this.setData({
      ["calendarParams.location"]: e.detail.value,
    });
  },
  alarmChange: function (e) {
    this.setData({
      ["calendarParams.alarm"]: e.detail.value === "true",
    });
  },
  handleAlarmOffsetInput: function (e) {
    this.setData({
      ["calendarParams.alarmOffset"]: Number(e.detail.value),
    });
  },
  eventHandler(e) {
    console.log(e);
    console.log(this.data.calendarParams);
    if (!e.detail.errNo) {
      tt.showToast({
        title: "添加成功",
      });
    } else {
      tt.showToast({
        title: "添加失败，请进入日志寻找原因",
        icon: "none",
      });
    }
    this.setData({
      result: e.detail.errMsg,
    });
  },
});
