Page({
  navigateToScene() {
    tt.navigateToScene({
      scene: 'sidebar',
      activity: 'xxx',
      success: (data) => {
        console.log(data)
      },
      fail: (data) => {
        console.log(data)
      },
    })
  },
})
