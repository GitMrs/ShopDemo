//获取应用实例
var app = getApp()
Page({
  data: {
    albums: [],
    videoList: [],
    scrollTop: 0,
    indicatorDots: true,
    autoplay: false,
    duration: 1000,
    playerShow: false,
    videoUrl: '',
    videoTitle: '',
    videoIndex: 0
  },
  changeAlbum: function (e) {
    this.setData({
      videoList: this.data.albums[e.detail.current].videos,
      scrollTop: 0
    })
  },
  playVideo: function (e) {
    let index = e.currentTarget.dataset.id
    this.setData({
      videoTitle: this.data.videoList[index].title,
      videoUrl: this.data.videoList[index].play_url,
      playerShow: true,
      videoIndex: index
    })
  },
  closeVideo: function () {
    this.setData({
      videoUrl: '',
      playerShow: false
    })
  },
  preVideo: function () {
    let index = this.data.videoIndex
    if (index === 0) {
      wx.showToast({
        title: '前面没有啦！',
        icon: 'loading',
        duration: 10000
      })
      setTimeout(function(){
        wx.hideToast()
      },1000)
    } else {
      this.setData({
        videoTitle: this.data.videoList[index - 1].title,
        videoUrl: this.data.videoList[index - 1].play_url,
        videoIndex: index - 1
      })
    }
  },
  nextVideo: function () {
    let index = this.data.videoIndex
    if (index === this.data.videoList.length - 1) {
      wx.showToast({
        title: '后面没有啦！',
        icon: 'loading',
        duration: 10000
      })
      setTimeout(function(){
        wx.hideToast()
      },1000)
    } else {
      this.setData({
        videoTitle: this.data.videoList[index + 1].title,
        videoUrl: this.data.videoList[index + 1].play_url,
        videoIndex: index + 1
      })
    }
  },
  onReady: function () {
    var that = this
    wx.request({
      url: 'https://api.idarex.com/www/index',
      success (res) {
        that.setData({
          albums: res.data.columns,
          videoList: res.data.columns[0].videos
        })
      }
    })
  }
})
