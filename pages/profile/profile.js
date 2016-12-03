// wx相关 API 操作
import {chooseImage,imgUpInfo} from '../../libraries/wx.js'

Page({
  data: {
    mark:true,
    title: 'About Me',
    dailymakes:[{"type":'text','content':111},{"type":'text','content':222},{"type":"image",width:100,height:100,"src":'http://ohhtkbaxs.bkt.clouddn.com/1480746100230.jpeg'}],
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
      imgUpInfo(res).then(values => { 
          var obj = {}
          obj.type = 'image',obj.width = values[0].width, obj.height = values[0].height,obj.src = JSON.parse(values[1]).poster
          let dd = this.data.dailymakes.concat(obj)
          this.setData({dailymakes:dd})
      });
    })
  },
  operate(){
    wx.showActionSheet({
      itemList: ['添加文字', '添加图片', '确定发布'],
      success: res=>{
        if (!res.cancel) {
          switch (res.tapIndex) {
            case 0:
              console.log('0');
              break;
            case 1:
              this.addImg()
              break;
            case 2:
              console.log('2')
              break;
            default:
              break;
          }
        }
      }
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
  test(){
    //var obj = [{"type":'text','content':111},{"type":'text','content':222},{"type":"image",width:100,height:100,"src":'http://ohhtkbaxs.bkt.clouddn.com/1480746100230.jpeg'}]
    //this.setData({dailymakes:[{"type":"image",width:100,height:100,"src":'http://ohhtkbaxs.bkt.clouddn.com/1480746100230.jpeg'}]})
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