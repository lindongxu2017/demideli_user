// pages/center/center.js
const app = getApp()
const myFn = app.myFn
const api = app.api
// console.log(myFn)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'http://service.qinhantangtop.com/Uploads/icon/icon_',
    routerName: '',
    bool: false,
    userinfo: {},
    current: '',
    total: '',
    IO: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var timer = setInterval(res => {
      if (!this.data.IO && wx.getStorageSync('session3rd')) {
        this.getInfo()
        this.getCurrent()
        this.getTotal()
        this.data.IO = true
        clearInterval(timer)
      }
    }, 100)
  },
  routeTo(e) {
    var self = this
    var path = e.target.dataset.set || e.currentTarget.dataset.set
    var index = e.target.dataset.index || e.currentTarget.dataset.index
    var url = path + '/' + path
    if (path == 'all' || path == 'month') {
      url = './all/all?index=' + index
    }
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
  },

  onReady: function () { },
  onShow: function () {

  },
  getInfo() {
    myFn.ajax('post', { 'session3rd': wx.getStorageSync('session3rd') }, api.user.info, res => {
      this.setData({ userinfo: res.data })
    })
  },
  getCurrent() {
    myFn.ajax('post', { 'session3rd': wx.getStorageSync('session3rd') }, api.user.monthYj, res => {
      this.setData({ current: res.data.monthJx })
    })
  },
  getTotal() {
    myFn.ajax('post', { 'session3rd': wx.getStorageSync('session3rd') }, api.user.totalYj, res => {
      this.setData({ total: res.data.totalJx })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})