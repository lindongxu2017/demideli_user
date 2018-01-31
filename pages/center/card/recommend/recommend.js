const app = getApp()
const myFn = app.myFn
const api = app.api
Page({
  data: {
    cardInfo: {}
  },
  onLoad: function (options) {
    this.setData({ cardInfo: wx.getStorageSync('cardInfo') })
  }
})