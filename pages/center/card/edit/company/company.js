const app = getApp()
const myFn = app.myFn
const api = app.api
Page({
  data: {
    name: '',
    desc: '',
    address: '',
    session3rd: ''
  },
  onLoad: function (options) {
    this.setData({
      session3rd: wx.getStorageSync('session3rd'),
      name: wx.getStorageSync('cardInfo').company_name,
      desc: wx.getStorageSync('cardInfo').company_intro,
      address: wx.getStorageSync('cardInfo').company_address
    })
  },
  inputValue(e) {
    var key = e.target.dataset.key || e.currentTarget.dataset.key
    this.setData({ [key]: e.detail.value })
  },
  submit() {
    console.log(this.data.address)
    myFn.ajax('post', {
      session3rd: this.data.session3rd,
      company_name: this.data.name,
      company_intro: this.data.desc,
      company_address: this.data.address
    }, api.user.setCard, res => {
      wx.navigateBack()
    })
  }
})