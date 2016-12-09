//app.js
var wilddog = require('wilddog-weapp-all')


App({
  onLaunch: function () {
    console.log('onLaunch')
    var config = {
        syncURL: 'https://wallace741130.wilddogio.com',
        authDomain: 'wallace741130.wilddog.com'
    }
    wilddog.initializeApp(config)
    wilddog.auth().signInWeapp(function (err, user) {
      console.log(err)
      console.log(user)
    })
    //this.ref = wilddog.sync().ref('todo');
    //调用API从本地缓存中获取数据
/*    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)*/
  },
  getRef:function(name){
    console.log('getRef')
    var refName = name?'todo/'+name:'todo'
    return wilddog.sync().ref(refName);
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              console.log('getUserInfo',that.globalData.userInfo)
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})