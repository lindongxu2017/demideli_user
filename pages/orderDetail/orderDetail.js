// pages/orderDetail/orderDetail.js
const app = getApp()
var myFn = app.myFn
var api = app.api
// console.log(myFn)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'http://service.qinhantangtop.com/Uploads/icon/icon_',
    detail: {},
    status: ''
  },
  getDetail(id) {
    myFn.ajax('post', { order_id: id, session3rd: wx.getStorageSync('session3rd') }, api.order.detail, res => {
      this.setData({ detail: res.data })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    myFn = getApp().myFn
    api = getApp().api
    console.log(e)
    this.setData({ status: e.status })
    this.getDetail(e.id)
  },
  onShow: function () {
    
  }
})