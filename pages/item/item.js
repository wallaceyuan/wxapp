// Douban API 操作
const douban = require('../../libraries/douban.js')

// 创建一个页面对象用于控制页面的逻辑
Page({
  data: {
    title: '',
    loading: true,
    book: {}
  },

  onLoad (params) {
    douban.findLink(params.id)
      .then(d => this.setData({ title: d.book.title, book: d.book,ant:d.annotations,loading: false }))
      .catch(e => {
        this.setData({ title: '获取数据异常', book: {}, loading: false })
        console.error(e)
      })
  },

  onReady () {
    wx.setNavigationBarTitle({ title: this.data.title + ' « 读书 « 豆瓣' })
  }
})
