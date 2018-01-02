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
    value: '',
    id: ''
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
      order_id: this.data.id,
      content: this.data.value,
      session3rd: wx.getStorageSync('session3rd')
    }
    // console.log(api.admin.register)
    myFn.ajax('post', data, api.order.comment, res => {
      myFn.popup(false, '评价成功！', (res) => {
        wx.navigateBack()
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({ id: e.id })
  }
})