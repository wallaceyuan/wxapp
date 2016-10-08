const API_URL = 'https://api.douban.com/v2/book'


https://api.douban.com/v2/book/1074458/annotations?order=rank

function fetchApi (type, params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${API_URL}/${type}`,
      data: Object.assign({}, params),
      header: { 'Content-Type': 'application/json' },
      success: resolve,
      fail: reject
    })
  })
}

module.exports = {
  find (type, page = 1, count = 20, search = '') {
    const params = { start: (page - 1) * count, count: count }
    return fetchApi(type, search ? Object.assign(params, { q: search }) : params)
      .then(res => res.data)
  },

  findOne (id) {
    return fetchApi('/' + id)
      .then(res => res.data)
  },

  findSeries(id){
    return fetchApi('series/' + id+'/books')
      .then(res => res.data)
  },

  findLink(id){
    console.log('findLink')
      var p1 = fetchApi('/'+id)
      var p2 = fetchApi('/'+id+'/annotations?order=rank')
      return Promise.all([p1, p2]).then(value  => {
        console.log('value0',value[0])
        var dd = {}
        dd.book = value[0].data,dd.annotations = value[1].data
        console.log('all promise  aaa',dd )
        return dd 
      });
  }
}


// class Douban {
//   // 不支持
//   // static API_URL = 'https://api.douban.com/v2/movie/'

//   constructor (title, movies) {
//     this.title = title
//     this.movies = movies
//   }
// }
