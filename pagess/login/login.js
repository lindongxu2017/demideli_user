// pages/register/register.js
const app = getApp()
const myFn = app.myFn
const api = app.api
// console.log(myFn)
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: ''
  },
  /**
   * 自定义函数
   */
  inputValue(e) {
    var key = e.target.dataset.key || e.currentTarget.dataset.key
    this.setData({ [key]: e.detail.value })
    // console.log(this.data)
  },
  submit() {
    var storage = wx.getStorageSync('loginData')
    if (!this.data.username) {
      myFn.popup(false, '账号不能为空', null)
      return false
    }
    if (!this.data.password) {
      myFn.popup(false, '密码不能为空', null)
      return false
    }
    var data = {
      username: this.data.username,
      password: this.data.password,
      session3rd: wx.getStorageSync('session3rd')
    }
    // console.log(api.admin.register)
    myFn.ajax('post', data, api.admin.auth, res => {
      wx.redirectTo({ url: '/pagess/center/center' })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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