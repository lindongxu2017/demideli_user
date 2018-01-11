// pages/center/manage/manage.js
const app = getApp()
const myFn = app.myFn
const api = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'http://service.qinhantangtop.com/Uploads/icon/icon_',
    company_list: [],
    userinfo: {},
    is_register: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ is_register: wx.getStorageSync('is_register') })
    if (wx.getStorageSync('is_register') == 0) {
      this.setData({ userinfo: wx.getStorageSync('userinfo') })
    } else {
      this.setData({ userinfo: wx.getStorageSync('appInfo') })
    }
    this.getCompanyList()
  },
  getCompanyList() {
    myFn.ajax('post', { session3rd: wx.getStorageSync('session3rd') }, api.user.companyList, res => {
      this.setData({ company_list: res.data })
    })
  },
  routeTo(e) {
    var self = this
    var path = e.target.dataset.routername || e.currentTarget.dataset.routername
    var url = path + '/' + path
    if (path == 'add') {
      if (wx.getStorageSync('is_register') == 0) {
        url = '/pages/register/register'
      } else {
        url = '/pages/center/auth/auth?type=2'
      }
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