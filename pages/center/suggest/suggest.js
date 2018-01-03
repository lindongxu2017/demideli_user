// pages/center/suggest/suggest.js
const app = getApp()
const myFn = app.myFn
const api = app.api
// console.log(myFn)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: ''
  },
  bindTextAreaBlur(e) {
    this.setData({ value: e.detail.value })
    // console.log(this.data.value)
  },
  submit() {
    if (!this.data.value) {
      myFn.popup(false, '内容不能为空', null)
      return false
    }
    var data = {
      content: this.data.value,
      session3rd: wx.getStorageSync('session3rd')
    }
    // console.log(api.admin.register)
    myFn.ajax('post', data, api.user.suggest, res => {
      myFn.popup(false, '感谢您的反馈建议，我们将在24小时内将处理结果告知您！', (res) => {
        wx.navigateBack()
      })
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