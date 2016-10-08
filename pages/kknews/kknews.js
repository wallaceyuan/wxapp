// kknews API 操作
const kknews = require('../../libraries/kkapi.js')

// 创建一个页面对象用于控制页面的逻辑
Page({
  data: {
    infos: [],
    id:488,
    loading: false,
    hasMore: false,
    next:0
  },

  onLoad () {
    this.search(0)
  },

  loadMore () {
    if (!this.data.hasMore) return

    this.setData({loading: true })
    this.search(this.data.next)
  },

  search (params) {
    this.setData({hasMore: true, loading: true})
    kknews.find(this.data.id,params)
      .then(d => {
        console.log(d,d.list)
          if(d.list.length){
              d.list[0].index = 0
              this.setData({infos:params?this.data.infos.concat(d.list):d.list, loading: false,next:d.list[d.list.length-1].newstime })
          }else{
              this.setData({hasMore:false,loading:false})
          }
      })
      .catch(e =>{
          this.setData({infos: [], loading: false })
          console.error(e)
      })
  }
})
