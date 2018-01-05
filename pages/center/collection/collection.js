// pages/index/list/list.js
const app = getApp()
const myFn = app.myFn
const api = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  getList(id) {
    myFn.ajax('post', { session3rd: wx.getStorageSync('session3rd'), page: 1 }, api.user.collection, res => {
      this.setData({ list: res.data.data })
    })
  },
  go_details(e) {
    var id = e.target.dataset.id || e.currentTarget.dataset.id
    var self = this;
    if (!self.data.bool) {
      wx.navigateTo({
        url: '/pages/index/details/details?id=' + id,
        success: function () {
          self.setData({ bool: true })
          setTimeout(() => {
            self.setData({ bool: false })
          }, 1000)
        }
      })
    }
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    this.getList(options.id)
    console.log(options.id)
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