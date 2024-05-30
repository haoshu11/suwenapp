Page({
  data: {
    isFollowed: false
  },
  click() {
    tt.followOfficialAccount({
      success: res => {
        if (res.errCode === 0) {
          console.log('已关注过');
        } else {
          console.log(res.errMsg);
        }
        this.checkFollowState();
      },
      fail: err => {
        console.log(err)
      },
      complate: res => {
        console.log('已触发关注', res);
      }
    });
  },
  checkFollowState() {
    tt.checkFollowState({
      success: ({ result: isFollowed }) => {
        console.log(isFollowed, 'isFollowed');
        this.setData({
          isFollowed
        });
      },
      fail: ({ errMsg }) => {
        tt.showToast({
          title: errMsg
        });
      },
    });
  }
})
