const API_URL = 'http://www.kankanews.com/webapi/kklist'

function fetchApi (type, params,time) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${API_URL}/${type}/${time}`,
      //data: Object.assign({}, params),
      header: { 'Content-Type': 'application/json' },
      success: resolve,
      fail: reject
    })
  })
}

module.exports = {

  find (id, timestamp=0) {
    return fetchApi(id, {next: timestamp},timestamp)
      .then(res => res.data)
  },

  findOne (id) {
    return fetchApi('/' + id)
      .then(res => res.data)
  },

  findSeries(id){
    return fetchApi('series/' + id+'/books')
      .then(res => res.data)
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
