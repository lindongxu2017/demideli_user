// pages/center/card/card.js
const app = getApp()
const myFn = app.myFn
const api = app.api
Page({
  data: {
    url: 'http://service.qinhantangtop.com/Uploads/icon/icon_',
    headImg: '',
    userInfo: '',
    animation: '',
    bool: false,
    popupVisible: false,
    cardInfo: {},
    id: '',
    DIY: false,
    lock: false
  },
  onLoad: function (options) {
    if (wx.getStorageSync('appInfo')) {
      this.setData({ userInfo: wx.getStorageSync('appInfo') })
    }
    myFn.ajax('post', { session3rd: wx.getStorageSync('session3rd') }, api.user.wxQRcode, res => {
      this.setData({ headImg: res.data.acode })
    })
    if (options.id) {
      this.setData({
        id: options.id,
        DIY: true
      })
    }
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1000,
      timingFunction: "ease",
      delay: 0
    })
    this.animation = animation;

    animation.rotate(315).step();

    this.setData({
      animationData: animation.export()
    })

    // 获取分享链接的参数
    console.log(options)
  },
  onShow() {
    this.setData({ lock: false })
    var timer = setInterval(res => {
      if (!this.data.lock) {
        if (!wx.getStorageSync('userID')) return false;
        this.setData({ lock: true})
        clearInterval(timer)
        var id = this.data.id || wx.getStorageSync('userID')
        if (wx.getStorageSync('cardInfo')) {
          this.setData({ cardInfo: wx.getStorageSync('cardInfo') })
        } else {
          myFn.ajax('post', { uid: id }, api.user.getCard, res => {
            this.setData({ cardInfo: res.data })
            wx.setStorageSync('cardInfo', res.data)
          })
        }
      }
    }, 200)
  },
  popup() {
    this.setData({ popupVisible: !this.data.popupVisible })
  },
  previewImage() {
    var arr = []
    arr[0] = this.data.cardInfo.qrcode[0] || this.data.headImg
    wx.previewImage({
      current: this.data.cardInfo.qrcode[0] || this.data.headImg, // 当前显示图片的http链接
      urls: arr // 需要预览的图片http链接列表
    })
  },
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.userInfo.name || this.data.cardInfo.mobile
    })
  },
  routeTo(e) {
    var self = this
    var path = e.target.dataset.set || e.currentTarget.dataset.set
    var url = path + '/' + path
    if (path == 'edit' && this.data.DIY) {
      url = '/pages/register/register'
    }
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
  },
  // 分享
  onShareAppMessage() {
    var id = this.data.userInfo.id || this.data.cardInfo.uid
    return {
      title: '得米得利',
      path: '/pages/center/card/card?id=' + id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})