const app = getApp()
var myFn = app.myFn
var api = app.api
Page({
  data: {
    cardInfo: {}
  },
  onLoad: function (options) {
    myFn = getApp().myFn
    api = getApp().api
    this.setData({ cardInfo: wx.getStorageSync('cardInfo') })
  },
  onShow () {
    
  }
})