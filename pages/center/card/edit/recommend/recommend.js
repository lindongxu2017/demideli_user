const app = getApp()
const myFn = app.myFn
const api = app.api
Page({
  data: {
    desc: '',
    session3rd: ''
  },
  onLoad: function (options) {
    this.setData({
      session3rd: wx.getStorageSync('session3rd'),
      desc: wx.getStorageSync('cardInfo').recomme_intro
    })
  },
  inputValue(e) {
    var key = e.target.dataset.key || e.currentTarget.dataset.key
    this.setData({ [key]: e.detail.value })
  },
  submit() {
    myFn.ajax('post', {
      session3rd: this.data.session3rd,
      recomme_intro: this.data.desc,
    }, api.user.setCard, res => {
      wx.navigateBack()
    })
  }
})