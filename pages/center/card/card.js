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
      popupVisible: false
    },
    onLoad: function (options) {
        myFn.ajax('post', { session3rd: wx.getStorageSync('session3rd') }, api.user.wxQRcode, res => {
            this.setData({ headImg: res.data.acode, userInfo: wx.getStorageSync('appInfo')})
        })

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
    popup () {
      this.setData({ popupVisible: !this.data.popupVisible})
    },
    previewImage () {
      var arr = []
      arr[0] = this.data.headImg
      wx.previewImage({
        current: this.data.headImg, // 当前显示图片的http链接
        urls: arr // 需要预览的图片http链接列表
      })
    },
    callPhone () {
        wx.makePhoneCall({
            phoneNumber: '12345678900'
        })  
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
    },
    // 分享
    onShareAppMessage () {
      return {
        title: '得米得利',
        path: '/pages/center/card/card?id=' + this.data.userInfo.id,
        success: function (res) {
          // 转发成功
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }
})