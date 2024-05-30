const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Page({
  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    year: date.getFullYear(),
    value: [9999, 1, 1],
    immediateChange: false
  },
  bindChange(e) {
    const val = e.detail.value
    console.log('Detail value of bindChange: ', val);
    tt.showToast({
      icon: 'none',
      title: this.data.immediateChange ? "松手立即回调" : "动画结束回调",
    });
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
    })
  },
  bindStart(e) {
    console.log('Detail value of bindpickstart: ', e.detail.value);
  },
  bindEnd(e) {
    console.log('Detail value of bindpickend: ', e.detail.value);
  },
  switchChange(e) {
    this.setData({
      immediateChange: e.detail.value,
    })
  }
})