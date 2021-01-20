// pages/movieDetail.js
Page({
  data: {
    movieId: '',
    movieDetail: {},
    setId: 0
  },

  onLoad: function (options) {
    console.log(options, 2435)
    this.setData({
      movieId: options.id,
      setId: options.setId || 0
    }, () => {
      this.getMovieDetail()
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  getMovieDetail() {
    wx.request({
      url: 'https://mediachain.info/api/detail',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        ids: this.data.movieId
      },
      success: res => {
        if (res.statusCode == 200) {
          this.setData({
            movieDetail: res.data.data[0]
          })
        } else {
          wx.showToast({
            title: '请求失败',
            icon: 'none'
          })
        }
      }
    })
  }
})