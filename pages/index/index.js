const app = getApp()

Page({
  data: {
    movieList: [],
    pageIndex: 1,
    searchContent: ''
  },
  onLoad: function () {
    this.getView()
  },
  onPullDownRefresh: function() {
    this.setData({
      pageIndex: 1
    }, () => {
      this.getView()
    })
  },
  onReachBottom() {
    this.setData({
      pageIndex: this.data.pageIndex++
    }, () => {
      this.getView()
    })
  },
  getView() {
    wx.request({
      url: 'https://mediachain.info/api/resource/list',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        page: this.data.pageIndex
      },
      success: res => {
        if (res.statusCode == 200) {
          this.setData({
            movieList: res.data.data
          })
        } else {
          wx.showToast({
            title: '请求失败',
            icon: 'none'
          })
        }
      }
    })
  },
  goNextPage(e) {
    wx.navigateTo({
      url: '/pages/movieDetail/movieDetail?id=' + e.target.dataset.id
    })
  },
  goNextPageAndHavePage(e) {
    console.log(e, 23434534)
    wx.navigateTo({
      url: '/pages/movieDetail/movieDetail?id=' + e.target.dataset.id + '&setId=' + e.target.dataset.setid
    })
  },
  handleGetNewContent() {
    wx.showLoading({
      title: '请求中',
    })
    wx.request({
      url: 'https://mediachain.info/api/search',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        name: this.data.searchContent
      },
      success: res => {
        if (res.statusCode == 200) {
          this.setData({
            movieList: res.data
          })
        } else {
          wx.showToast({
            title: '请求失败',
            icon: 'none'
          })
        }
        wx.hideLoading()
      }
    })
  }
})
