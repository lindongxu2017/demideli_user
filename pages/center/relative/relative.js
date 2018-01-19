// pages/center/relative/relative.js
const app = getApp()
const myFn = app.myFn
const api = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    relative: []
  },
  onLoad: function (options) {
    var data = {
      session3rd: wx.getStorageSync('session3rd'),
      uid: wx.getStorageSync('userID')
    }
    myFn.ajax('post', data, api.user.dowmlist, res => {
      this.setData({ relative: res.data })
    })
  }
})