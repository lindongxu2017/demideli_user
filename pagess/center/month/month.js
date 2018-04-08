const app = getApp()
var myFn = app.myFn
var api = app.api
// console.log(myFn)
Page({
  data: {
    url: 'http://service.qinhantangtop.com/Uploads/icon/icon_',
    current: {},
    total: {}
  },
  onLoad(options) {
    myFn = getApp().myFn
    api = getApp().api
    this.getCurrent()
    this.getTotal()
  },
  onShow () {
    
  },
  getCurrent() {
    myFn.ajax('post', { 'session3rd': wx.getStorageSync('session3rd') }, api.user.monthYj, res => {
      this.setData({ current: res.data })
    })
  },
  getTotal() {
    myFn.ajax('post', { 'session3rd': wx.getStorageSync('session3rd') }, api.user.totalYj, res => {
      this.setData({ total: res.data })
    })
  }
})
