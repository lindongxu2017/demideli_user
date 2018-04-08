const app = getApp()
var myFn = app.myFn
var api = app.api
// console.log(myFn)
Page({
  data: {
    url: 'http://service.qinhantangtop.com/Uploads/icon/icon_',
    current: {},
    total: {},
    bool: false,
    index: ''
  },
  change(e) {
    this.setData({ index: e.detail.current })
    // console.log(this.data.index)
  },
  switchPage() {
    this.data.index == 0 ? this.setData({ index: 1 }) : this.setData({ index: 0 })
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
  },
  onLoad(options) {
    myFn = getApp().myFn
    api = getApp().api
    this.setData({ index: options.index })
    this.getCurrent()
    this.getTotal()
  },
  onShow () {
    
  }
})
