import {chooseImage,imgUpInfo} from '../../libraries/wx.js'
var app = getApp();
var ref = app.getRef();
var updateInfo;

Page({
	data:{
		dailymakes:[],
		text:'',
		userInfo:{}
	},
	delImg(e){
		let index = e.target.dataset.index
		this.data.dailymakes.splice(index,1)
		this.setData({dailymakes:this.data.dailymakes})
		console.log(this.data.dailymakes)
	},
	ok(){
		var obj = {}
		obj.type = 'text',obj.text = this.data.text
		let dd = this.data.dailymakes.concat(obj)
		this.setData({dailymakes:dd})
		/*获取缓存*/
	    let localData = wx.getStorageSync('dailymakes') || []
	    localData = localData.concat(Array.from(this.data.dailymakes))
	    /*更新合并缓存*/
	    wx.setStorageSync('dailymakes', localData)

	    var postsRef = ref.child(this.data.userInfo.nickName);
	    
	    postsRef.push({"value" : this.data.dailymakes});

		this.setData({dailymakes:[],text:''})
		/*跳转*/
		wx.redirectTo({
			url: "../profile/profile",
		});
	},
	bindTextAreaBlur(e) {
		this.setData({text:e.detail.value})
	},
	addImg (){
		chooseImage().then((res)=>{
			imgUpInfo(res).then(values => { 
				var obj = {}
				obj.type = 'image',obj.width = values[0].width, obj.height = values[0].height,obj.src = JSON.parse(values[1]).poster
				let dd = this.data.dailymakes.concat(obj)
				this.setData({dailymakes:dd})
				console.log(this.data.dailymakes)
			});
		})
	},
	onLoad(){
		app.getUserInfo(userInfo=>{
			//更新数据
			this.setData({
				userInfo:userInfo
			})
		})
	}
})