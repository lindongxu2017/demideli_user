// pages/register/register.js
const app = getApp()
const myFn = app.myFn
const api = app.api
// console.log(myFn)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '1', value: '请确认同意本平台服务协议', checked: true }
    ],
    phone: '',
    code: '',
    protocol: '1',
    codeTitle: '获取验证码'
  },
  /**
   * 自定义函数
   */
  checkboxChange: function (e) {
    e.detail.value[0] ? this.setData({ protocol: e.detail.value[0] }) : this.setData({ protocol: '' })
    // console.log(e.detail.value[0])
  },
  inputValue(e) {
    var key = e.target.dataset.key || e.currentTarget.dataset.key
    this.setData({ [key]: e.detail.value })
    // console.log(this.data)
  },
  getcode() {
    if (this.data.codeTitle === '获取验证码') {
      var data = {
        mobile: this.data.phone,
        type: 'register'
      }
      myFn.ajax('post', data, api.common.getMobileCode, res => {
        this.setData({ codeTitle: '60s' })
        this.set_codeTime();
      })
    }
  },
  set_codeTime() {
    setTimeout(() => {
      this.setData({ codeTitle: parseInt(this.data.codeTitle) - 1 + 's' })
      if (this.data.codeTitle === '0s') {
        this.setData({ codeTitle: '获取验证码' })
      } else {
        this.set_codeTime();
      }
    }, 1000);
  },
  submit() {
    if (!this.data.phone) {
      myFn.popup(false, '手机号码为空', null)
      return false
    }
    if (!this.data.code) {
      myFn.popup(false, '验证码为空', null)
      return false
    }
    if (!this.data.protocol) {
      myFn.popup(false, '请确认服务协议', null)
      return false
    }
    var data = {
      mobile: this.data.phone,
      code: this.data.code,
      session3rd: wx.getStorageSync('session3rd')
    }
    // console.log(api.admin.register)
    myFn.ajax('post', data, api.admin.register, res => {
      wx.switchTab({ url: '/pages/center/center' })
      wx.setStorageSync('is_register', 1)
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