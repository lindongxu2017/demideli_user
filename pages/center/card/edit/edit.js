// pages/center/card/edit/edit.js
Page({
  data: {
    url: 'http://service.qinhantangtop.com/Uploads/icon/icon_',
    bool: false
  },
  onLoad: function (options) {
  
  },
  routeTo(e) {
    var self = this
    var path = e.target.dataset.set || e.currentTarget.dataset.set
    var url = path + '/' + path
    if (!self.data.bool) {
      wx.navigateTo({
        url: url,
        success: function () {
          self.data.bool = true
          setTimeout(() => {
            self.data.bool = false
          }, 1000)
        }
      })
    }
  }
})