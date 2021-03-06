// pages/pay/pay.js
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
    default_way: 2,
    detail: {},
    value: '',
    id: ''
  },
  changeWay(options) {
    console.log(options)
    this.setData({ default_way: options.target.dataset.way })
  },
  getDetail(id) {
    myFn.ajax('post', { order_id: id, session3rd: wx.getStorageSync('session3rd') }, api.order.detail, res => {
      this.setData({ detail: res.data })
    })
  },
  inputValue(e) {
    // console.log(e)
    this.setData({ value: e.detail.value })
  },
  pay() {
    if (this.data.default_way == 1) {
      myFn.ajax('post', { order_id: this.data.id, session3rd: wx.getStorageSync('session3rd'), type: 2, pay_sn: this.data.value }, api.pay.offline, res => {
        myFn.popup(false, '提交成功，请等待后台审核！', res => { wx.navigateBack() })
      })
    } else if (this.data.default_way == 2) {
      myFn.ajax('post', { order_id: this.data.id, session3rd: wx.getStorageSync('session3rd') }, api.pay.wxPay, res => {
        // console.log(res.data.jsApiParameters)
        var response = JSON.parse(res.data.jsApiParameters)
        console.log(response)
        wx.requestPayment({
          'timeStamp': response.timeStamp,
          'nonceStr': response.nonceStr,
          'package': response.package,
          'signType': response.signType,
          'paySign': response.paySign,
          'success': function (res) {
            wx.navigateBack()
          },
          'fail': function (res) {
            console.log(res)
            myFn.popup(false, '支付失败', res => { wx.navigateBack() })
          }
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    myFn = getApp().myFn
    api = getApp().api
    this.getDetail(options.id)
    this.setData({ id: options.id })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  }
})