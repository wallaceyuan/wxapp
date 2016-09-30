Page({
  data: {
    title: 'About Me',
    userInfo: {
      wechat: 'WEDN-NET',
      nickName: 'wallace',
      avatarUrl: '../../images/wechat_yuan.jpg'
    }
  },
  getUserInfo () {
    const that = this
    wx.getUserInfo({
      success (res) {
        console.log(res)
        that.setData({ userInfo: res.userInfo })
      }
    })
  },
  videoErrorCallback (e) {
      console.log('视频错误信息:');
      console.log(e.detail.errMsg);
  },
  onLoad () {
    wx.login({
      success (res) {
        if (res.code) {
          console.log('登录成功！' + res.code)
        } else {
          console.error('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail () {},
      complete () {},
    })
  }
})
