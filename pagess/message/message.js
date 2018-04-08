// pages/message/message.js
var app = getApp()
Page({
  data: {
    url: '',
    list: [],
    bool: false,
    mess_user_list: []
  },
  // onLoad: function (options) {
  //   // var userId = wx.getStorageSync('appInfo').id
  // },
  onShow() {
    app = getApp()
    app.success_scoket(res => {
      switch (res.type) {
        case 'get_single_user_list':
          this.setData({
            list: res.data
          })
          break;
        case 'send_product_info':
        case 'send_single_message':
          app.send_scoket({
            type: 'get_single_user_list',
            user_id: wx.getStorageSync('userID'),
            page: 1
          })
          break;
      }
    })
    app.send_scoket({
      type: 'get_single_user_list',
      user_id: wx.getStorageSync('userID'),
      page: 1
    })
  },
  router(e) {
    var self = this;
    if (!self.data.bool) {
      wx.navigateTo({
        url: './room/room?uid=' + e.currentTarget.dataset.uid,
        success: function () {
          self.setData({ bool: true })
          setTimeout(() => {
            self.setData({ bool: false })
          }, 1000)
        }
      })
    }
  }
})