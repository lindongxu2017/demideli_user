// pages/order/order.js
const app = getApp()
const myFn = app.myFn
const api = app.api
// console.log(myFn)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  // 获取列表
  getlist(_type) {
    myFn.ajax('post', { session3rd: wx.getStorageSync('session3rd'), type: _type }, api.order.list, res => {
      this.setData({ list: res.data.data })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlist(options.type)
  },
  onShow: function () {}
})