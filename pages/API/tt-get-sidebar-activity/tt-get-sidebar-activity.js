Page({
  data: {
    activity: '',
  },
  getSidebarActivity: function (options) {
    tt.getSidebarActivity({
      success: (data) => {
        console.log(data)
        if (data.activityList.length) {
          console.log('activity id:', data.activityList[0])
          this.setData({
            activity: data.activityList[0],
          })
        } else {
          this.setData({
            activity: '暂无生效中活动 id',
          })
        }
      },
      fail: (data) => {
        console.log(data)
        this.setData({
          activity: '获取失败',
        })
      },
    })
  },
})
