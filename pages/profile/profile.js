// wx相关 API 操作
import {chooseImage,imgUpInfo} from '../../libraries/wx.js'

Page({
  data: {
    mark:true,
    title: 'About Me',
    dailymakes:[111,222],
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
    chooseImage().then((res)=>{
      console.log(res)
      imgUpInfo(res).then(values => { 
        console.log(values,JSON.parse(values[1]).poster)
          var obj = {}
          obj.width = values[0].width, obj.height = values[0].height,obj.url = JSON.parse(values[1]).poster
          console.log(obj)
      });
    })
  },
  videoErrorCallback (e) {
      console.log('视频错误信息:');
      console.log(e.detail.errMsg);
  },
  tapclick (event){
    var attr = event.target.id
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