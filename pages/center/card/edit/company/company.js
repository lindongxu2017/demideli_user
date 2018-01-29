
Page({
  data: {
    name: '',
    desc: '',
    address: ''
  },
  onLoad: function (options) {

  },
  inputValue(e) {
    var key = e.target.dataset.key || e.currentTarget.dataset.key
    this.setData({ [key]: e.detail.value })
  }
})