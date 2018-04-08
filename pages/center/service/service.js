// pages/order/order.js
const app = getApp()
var myFn = app.myFn
var api = app.api
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
  // 详情
  godetail(e) {
    // console.log(e)
    var self = this;
    var id = e.currentTarget.dataset.id || e.target.dataset.id;
    var pid = e.currentTarget.dataset.pid || e.target.dataset.pid;
    var status = e.currentTarget.dataset.status || e.target.dataset.status;
    var right = e.currentTarget.dataset.right || e.target.dataset.right;
    // console.log(e.currentTarget.dataset)
    if (!self.data.bool) {
      self.setData({ bool: true })
      wx.navigateTo({
        url: '../../orderDetail/orderDetail?id=' + id + '&status=' + status,
        success: function () {
          setTimeout(() => { self.setData({ bool: false }) }, 1000)
        }
      })
    }
  },
  // goPay 支付
  goPay(e) {
    var id = e.target.dataset.id
    wx.navigateTo({ url: '../../pay/pay?id=' + id })
  },
  // goTodo 订单操作
  goTodo(e) {
    var id = e.target.dataset.id
    var pid = e.target.dataset.pid
    var type = e.target.dataset.type
    wx.navigateTo({ url: '../../order/todo/todo?id=' + id + '&pid=' + pid + '&type=' + type })
  },
  cancel(e) {
    var id = e.target.dataset.id
    var index = e.target.dataset.index
    myFn.popup(true, '是否取消维权？（取消之后无法再次维权！）', res => {
      myFn.ajax('post', { order_id: id, session3rd: wx.getStorageSync('session3rd') }, api.order.cancleRight, res => {
        this.data.list.splice(index, 1)
        this.setData({ list: this.data.list })
      })
    })
    // console.log(index)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    myFn = getApp().myFn
    api = getApp().api
    this.getlist(options.type)
  },
  onShow: function () {
    
  }
})