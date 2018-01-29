// pages/center/card/edit/info/info.js
Page({
  data: {
    name: '',
    tname: '',
    desc: ''
  },
  onLoad: function (options) {
  
  },
  inputValue(e) {
    var key = e.target.dataset.key || e.currentTarget.dataset.key
    this.setData({ [key]: e.detail.value })
  }
})