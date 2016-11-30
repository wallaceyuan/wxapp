Page({
  data: {
    mark:true,
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
  addImg (){
    console.log('addImg')
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
      }
    })
  },
  videoErrorCallback (e) {
      console.log('视频错误信息:');
      console.log(e.detail.errMsg);
  },
  tapclick (event){
    var attr = event.target.id
    console.log(attr)
    attr == "mark"? this.setData({mark:true}):this.setData({mark:false})
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
