// pages/orderDetail/orderDetail.js
const app = getApp()
const myFn = app.myFn
const api = app.api
// console.log(myFn)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513656878371&di=610b76e559cbdc5104b76a2e0f1cf14e&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F562c11dfa9ec8a1348a3970bfd03918fa1ecc0a4.jpg',
    detail: {},
    status: ''
  },
  getDetail(id) {
    myFn.ajax('', { order_id: id, session3rd: wx.getStorageSync('session3rd') }, api.order.detail, res => {
      this.setData({ detail: res.data })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({ status: e.status })
    this.getDetail(e.id)
  },
  onShow: function () {

  }
})