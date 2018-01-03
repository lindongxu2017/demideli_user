// pages/pay/pay.js
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
    default_way: 1,
    detail: {}
  },
  changeWay (options) {
    console.log(options)
    this.setData({default_way: options.target.dataset.way})
  },
  getDetail(id) {
    myFn.ajax('', { order_id: id, session3rd: wx.getStorageSync('session3rd') }, api.order.detail, res => {
      this.setData({ detail: res.data })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  }
})