// pages/center/card/card.js
const app = getApp()
var myFn = app.myFn
var api = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headImg: '',
    userInfo: ''
  },
  onLoad: function (options) {
    myFn = getApp().myFn
    api = getApp().api
    myFn.ajax('post', { session3rd: wx.getStorageSync('session3rd') }, api.user.wxQRcode, res => {
      this.setData({ headImg: res.data.acode, userInfo: wx.getStorageSync('appInfo') })
    })
  },
  onShow () {
    
  }
})