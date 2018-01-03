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
    is_register: '',
    is_auth: '',
    userinfo: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  routeTo(e) {
    var self = this
    var path = e.target.dataset.set || e.currentTarget.dataset.set
    var url = path + '/' + path
    if (path == 'auth') {
      if (this.data.is_register == 0) {
        url = '/pages/register/register'
      } else {
        url = path + '/' + path + '?type=1'
      }
    }
    if(path.split('-')[0] == 'order') {
      url = 'service/service?type=' + path.split('-')[1]
      console.log(url)
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    myFn.ajax('post', { 'session3rd': wx.getStorageSync('session3rd') }, api.user.info, res => {
      // 存缓存信息
      wx.setStorageSync('appInfo', res.data)
      wx.setStorageSync('is_register', 1)
      wx.setStorageSync('is_auth', parseInt(res.data.is_auth))
      // 根据缓存设置场景值
      this.setData({ is_register: wx.getStorageSync('is_register') })
      this.setData({ is_auth: wx.getStorageSync('is_auth') })
      this.setData({ userinfo: wx.getStorageSync('appInfo') })
    })
    this.setData({ userinfo: wx.getStorageSync('appInfo') })
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