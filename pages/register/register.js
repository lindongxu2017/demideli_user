// pages/register/register.js
const app = getApp()
var myFn = app.myFn
var api = app.api
const WxParse = require('../../wxParse/wxParse.js');
// console.log(myFn)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: '',
    protocol: false,
    protocol_type: '',
    codeTitle: '获取验证码',
    is_read: false,
    nextGo:''
  },
  /**
   * 自定义函数
   */
  onLoad (options) {
    myFn = getApp().myFn
    api = getApp().api
    console.log(options.type);
    this.data.nextGo = options.type
  },
  onShow () {
    
  },
  agree: function (e) {
    this.setData({ protocol: !this.data.protocol })
  },
  close_agree () {
    this.setData({ is_read: false})
  },
  read: function (e) {
    this.setData({ protocol_type: e.currentTarget.dataset.type })
    this.setData({ is_read: !this.data.is_read })
    this.getProtocol()
  },
  inputValue(e) {
    var key = e.target.dataset.key || e.currentTarget.dataset.key
    this.setData({ [key]: e.detail.value })
    // console.log(this.data)
  },
  getcode() {
    if (this.data.codeTitle === '获取验证码') {
      var data = {
        mobile: this.data.phone,
        type: 'register'
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
  getProtocol() {
    myFn.ajax('post', {}, api.system.info, (res) => {
      var protocol_content = '';
      this.data.protocol_type == 1 ? protocol_content = res.data.agreement : protocol_content = res.data.legal
      WxParse.wxParse('article', 'html', protocol_content, this, 0);
    })
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
    if (!this.data.protocol) {
      myFn.popup(false, '请确认服务协议', null)
      return false
    }
    
    var data = {
        mobile: this.data.phone,
        code: this.data.code,
        session3rd: wx.getStorageSync('session3rd')
    }
    
    myFn.ajax('post', data, api.admin.register, res => {
        wx.setStorageSync('islogin', 'true')
        wx.setStorageSync('is_register', 1)
        myFn.ajax('post', { 'session3rd': wx.getStorageSync('session3rd') }, api.user.info, res => {
            wx.setStorageSync('userID', res.data.id)
            wx.setStorageSync('appInfo', res.data)
            data.session3rd = (wx.getStorageSync('session3rd'));

            // 成为下级
            if (wx.getStorageSync('setDownID')) {
              myFn.ajax('post', {
                session3rd: wx.getStorageSync('session3rd'),
                uid: wx.getStorageSync('setDownID'),
                type: 2
              }, api.user.setDown, res => {
                // todo
              })
            }

            if (this.data.nextGo == 'goCard') {
                wx.redirectTo({ url: '/pages/center/card/edit/edit' })
            } else {
                wx.redirectTo({ url: '/pages/index/index' })
            }

        })
    })
  }
})