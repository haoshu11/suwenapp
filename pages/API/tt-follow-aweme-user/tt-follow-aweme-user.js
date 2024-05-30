const app=getApp();
Page({
  data: {
    isFollowed: false
  },
  click(){
    tt.followAwemeUser({
      awemeId:"176793430",
      success: (res) => {
        if(res.followed){
          console.log('已关注');
        }else{
          console.log('未关注');
        }
        this.setData({
          isFollowed: res.followed
        });
      },
      fail(err){
        console.log("查看失败",err)
      },
      complete(res){
        console.log("调用查看",res)
      }
    });
  }
})