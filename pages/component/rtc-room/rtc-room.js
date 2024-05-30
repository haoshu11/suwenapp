Page({
  data: {
    ctx: null,
    userIdList: [],
    videoState: 0,
    audioState: 0,
    streamPublishState: 0,
    streamSubscribeState: 0,
    screenSubscribeState: 0,
    visible: false,
    device: "speakerphone",
    appId: "618a0ef784f0cc00c33bd7fc", //每个应用的唯一标识符，由 RTC 控制台随机生成的。不同的 AppId 生成的实例在 RTC 中进行音视频通话完全独立，无法互通。
    token: "RTC_TOKEN",
    roomId: "001",
    userId: "userId1",
    camera: "front",
    scaleUserId: "",
    error: "no error",
  },
  onLoad() {
    this.getRtcToken().then((res) => {
      console.log(res);
      if (!res.errNo) {
        this.setData({
          token: res.data.rtcToken,
        });
      } else {
        tt.showToast({
          title: "获取token失败",
        });
        console.log("获取token失败", res);
      }
    });
    this.data.ctx = tt.createRtcRoomContext({
      appId: this.data.appId,
    });

    // 注册事件监听回调
    this.data.ctx.onRtcStateChanged(this.onRtcStateChanged);
    this.data.ctx.onRtcVideoMembersChanged(this.onRtcVideoMembersChanged);
    this.data.ctx.onRtcChatMembersChanged(this.onRtcChatMembersChanged);
    this.data.ctx.onRtcChatSpeakersChanged(this.onRtcChatSpeakersChanged);
    this.data.ctx.onRtcChatInterrupted(this.onRtcChatInterrupted);
    this.data.ctx.onRtcPublishScreenMembersChanged(
      this.onRtcPublishScreenMembersChanged
    );
    this.data.ctx.onRoomTokenWillExpire(this.onRoomTokenWillExpire);
  },
  getRtcToken() {
    // 获取token参考文档 https://www.volcengine.com/docs/6348/70121
    let url =
      "https://cloudapi.bytedance.net/faas/services/tteqzd/invoke/AccessTokenTest";
    let requestData = {
      roomId: "001",
      userId: "userId1",
      token: "RTC_TOKEN",
      microAppId: "tt07e3715e98c9aac0",
    };

    return new Promise((resolve) => {
      tt.request({
        url: url,
        method: "post",
        data: requestData,
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          resolve(err);
        },
      });
    });
  },
  handleError(e) {
    const { errNo, errMsg } = e.detail;
    this.setData({
      error: `errNo = ${errNo}, errMsg = ${errMsg}`,
    });
  },
  scaleCamera(e) {
    const userIdList = this.data.userIdList;
    if (this.data.scaleUserId === e.currentTarget.id) {
      for (let i = 0, len = userIdList.length; i < len; i++) {
        if (userIdList[i].userId === this.data.scaleUserId) {
          this.data.userIdList[i].class = "rtc-default";
        }
      }
      this.setData({ scaleUserId: "" });
    } else {
      this.setData({ scaleUserId: e.currentTarget.id });
      for (let i = 0, len = userIdList.length; i < len; i++) {
        if (userIdList[i].userId === this.data.scaleUserId) {
          this.data.userIdList[i].class = "rtc-select";
        } else {
          this.data.userIdList[i].class = "rtc-default";
        }
      }
    }
    this.setData({
      userIdList: this.data.userIdList,
    });
  },
  onRtcVideoMembersChanged({ userIdList }) {
    console.log("onRtcVideoMembersChanged res ", userIdList);
    const resOpenId = [];
    for (let i = 0; i < userIdList.length; i += 1) {
      resOpenId.push({
        class: "rtc-default",
        userId: userIdList[i],
        mode: this.data.userId === userIdList[i] ? "camera" : "video",
      });
    }

    this.setData({
      userIdList: resOpenId,
    });
  },
  onRtcChatMembersChanged(res) {
    console.log("onRtcChatMembersChanged ", res);
  },
  onRtcStateChanged(res) {
    console.log("onRtcStateChanged ", res);
  },
  onRtcChatSpeakersChanged(res) {
    console.log("onRtcChatSpeakersChanged ", res);
  },
  onRtcChatInterrupted(res) {
    console.log("onRtcChatInterrupted ", res);
  },
  onRtcPublishScreenMembersChanged(res) {
    console.log("onRtcPublishScreenMembersChanged ", res);
  },
  onRoomTokenWillExpire() {
    console.log("onRoomTokenWillExpire");
  },
  offRtcVideoMembersChanged() {
    this.data.ctx.offRtcVideoMembersChanged(this.onRtcVideoMembersChanged);
  },
  offRtcStateChanged() {
    this.data.ctx.offRtcStateChanged(this.onRtcStateChanged);
  },
  offRtcChatMembersChanged() {
    this.data.ctx.offRtcChatMembersChanged(this.onRtcChatMembersChanged);
  },
  offRtcChatSpeakersChanged() {
    this.data.ctx.offRtcChatSpeakersChanged(this.onRtcChatSpeakersChanged);
  },
  offRtcChatInterrupted() {
    this.data.ctx.offRtcChatInterrupted(this.onRtcChatInterrupted);
  },
  offRtcPublishScreenMembersChanged() {
    this.data.ctx.offRtcPublishScreenMembersChanged(
      this.onRtcPublishScreenMembersChanged
    );
  },
  offRoomTokenWillExpire() {
    this.data.ctx.offRoomTokenWillExpire(this.onRoomTokenWillExpire);
  },
  // 加入房间
  joinRtcRoom() {
    this.data.ctx.joinRtcRoom({
      roomId: this.data.roomId,
      token: this.data.token,
      userId: this.data.userId,
      success: (res) => {
        tt.showToast({
          title: "加入房间成功",
        });
        console.log("joinRtcRoom success ", res);
      },
      fail(res) {
        tt.showModal({
          title: "加入房间失败",
          content: `${res.errMsg || "请查看日志"}`,
        });
        console.log("joinRtcRoom fail ", res);
      },
      complete(res) {
        console.log("joinRtcRoom complete ", res);
      },
    });
  },
  switchCamera() {
    const camera = this.data.camera === "front" ? "back" : "front";
    this.setData({ camera });

    this.data.ctx.switchCamera({
      camera,
      success(res) {
        tt.showToast({
          title: "切换摄像头状态成功",
        });
        console.log("switchCamera success ", res);
      },
      fail(res) {
        tt.showModal({
          title: "切换摄像头状态失败",
          content: `${res.errMsg || "请查看日志"}`,
        });
        console.log("switchCamera fail ", res);
      },
      complete(res) {
        console.log("switchCamera complete ", res);
      },
    });
  },
  exitRtcRoom() {
    this.data.ctx.exitRtcRoom({
      roomId: this.data.roomId,
      success(res) {
        tt.showToast({
          title: "退出房间成功",
        });
        console.log("exitRtcRoom success ", res);
      },
      fail(res) {
        tt.showModal({
          title: "退出房间失败",
          content: `${res.errMsg || "请查看日志"}`,
        });
        console.log("exitRtcRoom fail ", res);
      },
      complete(res) {
        console.log("exitRtcRoom complete ", res);
      },
    });
  },
  changeVideoCapture() {
    const videoState = this.data.videoState === 0 ? 1 : 0;
    this.setData({ videoState });

    this.data.ctx.changeVideoCapture({
      state: videoState,
      success(res) {
        tt.showToast({
          title: "开启/关闭视频采集成功",
        });
        console.log("changeVideoCapture success ", res);
      },
      fail(res) {
        tt.showModal({
          title: "开启/关闭视频采集失败",
          content: `${res.errMsg || "请查看日志"}`,
        });
        console.log("changeVideoCapture fail ", res);
      },
      complete(res) {
        console.log("changeVideoCapture complete ", res);
      },
    });
  },
  changeAudioCapture() {
    const audioState = this.data.audioState === 0 ? 1 : 0;
    this.setData({ audioState });

    this.data.ctx.changeAudioCapture({
      state: audioState,
      success(res) {
        tt.showToast({
          title: "开启/关闭音频采集成功",
        });
        console.log("changeAudioCapture success ", res);
      },
      fail(res) {
        tt.showModal({
          title: "开启/关闭音频采集失败",
          content: `${res.errMsg || "请查看日志"}`,
        });
        console.log("changeAudioCapture fail ", res);
      },
      complete(res) {
        console.log("changeAudioCapture complete ", res);
      },
    });
  },
  changeUserVisibility() {
    const that = this;
    const visible = this.data.visible ? false : true;
    this.setData({ visible });

    this.data.ctx.changeUserVisibility({
      visible,
      success(res) {
        tt.showToast({
          title: `是否对他人可见: ${that.data.visible}`,
        });
        console.log("changeUserVisibility success ", res);
      },
      fail(res) {
        tt.showModal({
          title: "改变是否对他人可见失败",
          content: `${res.errMsg || "请查看日志"}`,
        });
        console.log("changeUserVisibility fail ", res);
      },
      complete(res) {
        console.log("changeUserVisibility complete ", res);
      },
    });
  },
  setVideoEncoderConfig() {
    this.data.ctx.setVideoEncoderConfig({
      maxSolution: {
        width: 640,
        height: 360,
        frameRate: 24,
      },
      success(res) {
        tt.showToast({
          title: "设置视频发布的最大视频流参数成功",
        });
        console.log("setVideoEncoderConfig success ", res);
      },
      fail(res) {
        tt.showModal({
          title: "设置视频发布的最大视频流参数失败",
          content: `${res.errMsg || "请查看日志"}`,
        });
        console.log("setVideoEncoderConfig fail ", res);
      },
      complete(res) {
        console.log("setVideoEncoderConfig complete ", res);
      },
    });
  },
  setAudioPlaybackDevice() {
    const device =
      this.data.device === "speakerphone" ? "earpiece" : "speakerphone";
    this.setData({ device });

    this.data.ctx.setAudioPlaybackDevice({
      device,
      success(res) {
        tt.showToast({
          title: "设置音频播放设备成功",
        });
        console.log(" setAudioPlaybackDevice success ", res);
      },
      fail(res) {
        tt.showModal({
          title: "设置音频播放设备失败",
          content: `${res.errMsg || "请查看日志"}`,
        });
        console.log(" setAudioPlaybackDevice fail ", res);
      },
      complete(res) {
        console.log(" setAudioPlaybackDevice complete ", res);
      },
    });
  },
  changeStreamPublishState() {
    const streamPublishState = this.data.streamPublishState ? 0 : 1;
    this.setData({ streamPublishState });
    this.data.ctx.changeStreamPublishState({
      state: streamPublishState,
      streamType: "both",
      success(res) {
        tt.showToast({
          title: "开启/关闭发布流成功",
        });
        console.log("changeStreamPublishState success ", res);
      },
      fail(res) {
        tt.showModal({
          title: "开启/关闭发布流失败",
          content: `${res.errMsg || "请查看日志"}`,
        });
        console.log("changeStreamPublishState fail ", res);
      },
      complete(res) {
        console.log("changeStreamPublishState complete ", res);
      },
    });
  },
  changeStreamSubscribeState() {
    const streamSubscribeState = this.data.streamSubscribeState ? 0 : 1;
    this.setData({ streamSubscribeState });

    this.data.ctx.changeStreamSubscribeState({
      state: streamSubscribeState,
      userId: this.data.userId === "user1" ? "user2" : "user1",
      streamType: "both",
      success(res) {
        tt.showToast({
          title: "开启/关闭订阅流成功",
        });
        console.log("changeStreamSubscribeState success ", res);
      },
      fail(res) {
        tt.showModal({
          title: "开启/关闭订阅流失败",
          content: `${res.errMsg || "请查看日志"}`,
        });
        console.log("changeStreamSubscribeState fail ", res);
      },
      complete(res) {
        console.log("changeStreamSubscribeState complete ", res);
      },
    });
  },
  changeScreenSubscribeState() {
    const screenSubscribeState = this.data.screenSubscribeState ? 0 : 1;
    this.setData({ screenSubscribeState });

    this.data.ctx.changeScreenSubscribeState({
      state: screenSubscribeState,
      userId: this.data.userId === "user1" ? "user2" : "user1",
      streamType: "both",
      success(res) {
        tt.showToast({
          title: "开启/关闭订阅屏幕流成功",
        });
        console.log("changeScreenSubscribeState success ", res);
      },
      fail(res) {
        tt.showModal({
          title: "开启/关闭订阅屏幕流失败",
          content: `${res.errMsg || "请查看日志"}`,
        });
        console.log("changeScreenSubscribeState fail ", res);
      },
      complete(res) {
        console.log("changeScreenSubscribeState complete ", res);
      },
    });
  },
  updateToken() {
    this.getRtcToken().then((res) => {
      if (!res.errNo) {
        this.data.ctx.updateToken({
          token: res.data.rtcToken,
          success(res) {
            tt.showToast({
              title: "更新token成功",
            });
            console.log("updateToken success ", res);
          },
          fail(res) {
            tt.showToast({
              title: "更新token失败",
            });
            console.log("updateToken fail ", res);
          },
        });
        this.setData({
          token: res.data.rtcToken,
        });
      } else {
        tt.showToast({
          title: "获取token失败",
        });
        console.log("获取token失败", res);
      }
    });
  },
});
