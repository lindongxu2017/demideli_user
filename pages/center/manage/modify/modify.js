// pages/center/manage/modify/modify.js
const app = getApp()
const myFn = app.myFn
const api = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: '',
    codeTitle: '获取验证码'
  },
  inputValue(e) {
    var key = e.target.dataset.key || e.currentTarget.dataset.key
    this.setData({ [key]: e.detail.value })
  },
  getcode() {
    if (this.data.codeTitle === '获取验证码') {
      var data = {
        mobile: this.data.phone,
        type: 'mobile'
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
    var data = {
      mobile: this.data.phone,
      code: this.data.code,
      session3rd: wx.getStorageSync('session3rd')
    }
    // console.log(api.admin.register)
    myFn.ajax('post', data, api.user.modify, res => {
      wx.navigateBack()
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