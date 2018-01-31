const app = getApp()
const myFn = app.myFn
const api = app.api
Page({
  data: {
    url: 'http://service.qinhantangtop.com/Uploads/icon/icon_',
    cardInfo: {}
  },
  onLoad: function (options) {
    this.setData({ cardInfo: wx.getStorageSync('cardInfo') })
  }
})