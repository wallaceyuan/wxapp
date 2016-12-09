import {chooseImage,imgUpInfo} from '../../libraries/wx.js'
var app = getApp();
var ref = app.getRef();
var updateInfo;

Page({
	data:{
		imgBox:[],
		dailymakes:[],
		text:'',
		userInfo:{}
	},
	delImg(e){
		let index = e.target.dataset.index
		this.data.imgBox.splice(index,1)
		this.setData({imgBox:this.data.imgBox})
		console.log(this.data.imgBox)
	},
	ok(e){
		var that = this
		
		var textObj = {}
		
		textObj.type = 'text',textObj.text = this.data.text

		//this.setData({dailymakes:that.data.dailymakes.concat(textObj)})
		/*获取缓存*/
		//let localData = wx.getStorageSync('dailymakes') || []

		//localData = localData.concat(Array.from(this.data.dailymakes))
		/*更新合并缓存*/
		//wx.setStorageSync('dailymakes', localData)

		var postsRef = ref.child(this.data.userInfo.nickName);

		//console.log(this.data.dailymakes)

		//postsRef.push(this.data.dailymakes);

		postsRef.push({
			'image':this.data.imgBox,
			'text':this.data.text
		})

		this.setData({imgBox:[],text:''})
		/*跳转*/
		wx.redirectTo({
			url: "../profile/profile",
		});
	},
	bindinput(e){
		console.log('bindinput')
	},
	bindChange(e){
		console.log('change')
	},
	bindTextAreaBlur(e) {
		this.setData({text:e.detail.value})
	},
	addImg (){
		chooseImage().then((res)=>{
			imgUpInfo(res).then(values => {
				var obj = {}
				var src = JSON.parse(values[1]).poster
				//obj.type = 'image',obj.width = values[0].width, obj.height = values[0].height,obj.src = JSON.parse(values[1]).poster
				//let dd = this.data.dailymakes.concat(obj)
				var image = this.data.imgBox.concat(src)
				this.setData({imgBox:image})
				console.log('imgBox',this.data.imgBox)
			});
		})
	},
	onLoad(){
		this.setData({
			userInfo:app.globalData.userInfo
		})
	}
})