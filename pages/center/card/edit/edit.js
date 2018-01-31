// pages/center/card/edit/edit.js
const app = getApp()
const myFn = app.myFn
const api = app.api
Page({
  data: {
    url: 'http://service.qinhantangtop.com/Uploads/icon/icon_',
    bool: false,
    id: ''
  },
  onLoad: function (options) {
    this.setData({ id: wx.getStorageSync('userID')})
  },
  onShow(options) {
    myFn.ajax('post', { uid: this.data.id}, api.user.getCard, res => {
      wx.setStorageSync('cardInfo', res.data)
    })
  },
  routeTo(e) {
    var self = this
    var path = e.target.dataset.set || e.currentTarget.dataset.set
    var url = path + '/' + path
    if (!self.data.bool) {
      wx.navigateTo({
        url: url,
        success: function () {
          self.data.bool = true
          setTimeout(() => {
            self.data.bool = false
          }, 1000)
        }
      })
    }
  }
})