// pages/center/account/account.js
const app = getApp()
var myFn = app.myFn
var api = app.api
Page({
  /**
   * 页面的初始数据
   */
  data: {
    apiData: {}
  },
  getlist() {
    myFn.ajax('post', { session3rd: wx.getStorageSync('session3rd'), page: 1 }, api.user.accountLog, res => {
      this.setData({ apiData: res.data.data })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    myFn = getApp().myFn
    api = getApp().api
    this.getlist();
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