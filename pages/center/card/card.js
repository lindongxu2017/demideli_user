// pages/center/card/card.js
const app = getApp()
var myFn = app.myFn
var api = app.api
Page({
    data: {
        id: '',
        options_id: '',
        url: 'http://service.qinhantangtop.com/Uploads/icon/icon_',
        headImg: '',
        userInfo: '',
        animation: '',
        bool: false,
        popupVisible: false,
        cardInfo: {},
        myCardInfo: {},
        // true为他人名片
        DIY: false,
        lock: false,
        wxMiniProgramCard: '',
        IO: false,
        optionsData: {}
    },
    onShow() {
      wx.removeStorageSync('cardInfo');
      this.data.IO = true;
      this.onLoad(this.data.optionsData);
    },
    onLoad: function (options) {
      if (!this.data.IO) {
        this.data.optionsData = options
        return false;
      }
      this.data.IO = false;
      var self = this
      myFn = getApp().myFn
      api = getApp().api
      // 分享进入
      if (options.id) {
        wx.setStorageSync('setDownID', options.id)
        this.data.id = options.id
      }
      // 扫码进入
      if (options.scene) {
        var scene = decodeURIComponent(options.scene)
        wx.setStorageSync('setDownID', scene.split(',')[0])
        this.data.id = scene.split(',')[0]
        // 设置下级
        this.setDown(scene.split(',')[0], scene.split(',')[1])
      }
      if (this.data.id) {
        this.setData({ DIY: true })
        this.getCardInfo(this.data.id)
        this.getMiniQRcode(this.data.id)
      } else {
        var timer = setInterval(res => {
          if (wx.getStorageSync('userID')) {
            clearInterval(timer);
            this.data.id = wx.getStorageSync('userID')
            this.data.userInfo = wx.getStorageSync('appInfo');
            this.setData({ userInfo: this.data.userInfo })
            this.getCardInfo(this.data.id)
            this.getMiniQRcode(this.data.id)
          }
        }, 50)
      }
      // 旋转动画设置
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
    },
    // 获取小程序码
    getMiniQRcode (id) {
      var path = 'pages/center/card/card'
      myFn.ajax('post', { url: path, uid: id }, api.user.QRcode, res => {
        this.setData({ wxMiniProgramCard: res.data.acode })
      })
    },
    // 设置下级
    setDown (id, type) {
      myFn.ajax('post', {
        session3rd: wx.getStorageSync('session3rd'),
        uid: id,
        type: type
      }, api.user.setDown, res => {
        // todo
      })
    },
    // 获取名片信息
    getCardInfo (id) {
      myFn.ajax('post', { uid: id }, api.user.getCard, res => {
        if (res.data == '' && id == wx.getStorageSync('userID')) {
          wx.navigateTo({
            url: '/pages/center/card/edit/edit'
          })
        }
        this.setData({ cardInfo: res.data })
        wx.setStorageSync('cardInfo', res.data)
        // console.log(res.data)
      })
    },
    // 加我微信弹出框
    popup() {
        this.setData({ popupVisible: !this.data.popupVisible })
    },
    // 预览图片
    previewImage() {
        var arr = []
        arr[0] = this.data.cardInfo.qrcode[0] || this.data.headImg
        wx.previewImage({
            current: arr[0], // 当前显示图片的http链接
            urls: arr // 需要预览的图片http链接列表
        })
    },
    previewImage2 () {
      var arr = []
      console.log(this.data.wxMiniProgramCard)
      arr[0] = this.data.wxMiniProgramCard;
      wx.previewImage({
        current: arr[0], // 当前显示图片的http链接
        urls: arr // 需要预览的图片http链接列表
      })
    },
    // 意见拨号
    callPhone() {
        wx.makePhoneCall({
          phoneNumber: this.data.cardInfo.mobile || this.data.userInfo.name
        })
    },
    routeTo(e) {
        var self = this
        var path = e.target.dataset.set || e.currentTarget.dataset.set
        // console.log(wx.getStorageSync('islogin'))
        // if (wx.getStorageSync('userID') != '') {
        //     myFn.ajax('post', { uid: wx.getStorageSync('userID') }, api.user.getCard, res => {
        //         this.setData({ myCardInfo: res.data })
        //         wx.setStorageSync('myCardInfo', res.data)
        //     })
        // }
        // var pages = getCurrentPages()    //获取加载的页面
        // var currentPage = pages[pages.length - 1]
        // if (currentPage.options.id) {
        //   this.getCardInfo(currentPage.options.id)
        // }

        if (path == 'edit' && !wx.getStorageSync('userID')) {
            console.log(wx.getStorageSync('userID'))
            wx.navigateTo({
                url: '/pages/register/register?type=goCard'
            })
            return false;
        }
        
        // myFn.ajax('post', { uid: this.data.id }, api.user.getCard, res => {
        //    代码块1
        // })
        // 代码块1 start
        if (this.data.id != wx.getStorageSync('userID') && path == 'edit') {
          wx.navigateTo({
            url: '/pages/center/card/card'
          })
        } else {
          var url = path + '/' + path
          if (!self.data.bool) {
            wx.navigateTo({
              url: url + '?id=' + this.data.id,
              success: function () {
                self.data.bool = true
                setTimeout(() => {
                  self.data.bool = false
                }, 1000)
              }
            })
          }
        }
        // 代码块1 end
    },
    // 分享
    onShareAppMessage() {
        return {
            title: '得米得利',
            path: '/pages/center/card/card?id=' + this.data.id,
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})