// pages/center/card/card.js
const app = getApp()
const myFn = app.myFn
const api = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headImg: '',
    userInfo: ''
  },
  onLoad: function (options) {
    myFn.ajax('post', { session3rd: wx.getStorageSync('session3rd') }, api.user.wxQRcode, res => {
      this.setData({ headImg: res.data.acode, userInfo: wx.getStorageSync('appInfo') })
    })
  }
})