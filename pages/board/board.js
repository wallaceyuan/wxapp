const douban = require('../../libraries/douban.js')
const util = require('../../utils/util.js')
Page({
  data: {
    books:[],
    loading: true,
    id:util.predict(Math.ceil(Math.random()*3))
  },
  setSeries(){
    this.getData(util.predict(Math.ceil(Math.random()*3)))
  },
  onLoad() {
    this.getData(this.data.id)
  },
  getData(id){
    id = id?id:1
    douban.findSeries(id)
      .then(d => this.setData({ books: d.books, loading: false }))
      .catch(e => {
        console.error(e)
        this.setData({ books: [], loading: false })
    })
  }
})