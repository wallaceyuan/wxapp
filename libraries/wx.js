 "use strict"
import Promise from 'es6-promise.min';

exports.chooseImage = ()=>{
    return new Promise((resolve, reject) =>{
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: resolve,
            fail: reject
        })
    })    
}

var getImageInfo = (res)=>{
    return new Promise((resolve,reject) =>{
        wx.getImageInfo({
            src: res.tempFilePaths[0],
            success: resolve,
            fail: reject
        })
    })
}

var uploadFile = (res)=>{
    return new Promise((resolve,reject) =>{
        wx.uploadFile({
            url: 'http://127.0.0.1:3000/upload',
            filePath: res.tempFilePaths[0],
            name: 'uploadPoster',
            formData:{
                'user': 'test'
            },
            success: (res)=>{
                resolve(res.data)
            },
            fail: function(err){
                console.log(err)
            },
        })
    })
}


exports.imgUpInfo = (res)=>{
    return Promise.all([getImageInfo(res),uploadFile(res)])
}