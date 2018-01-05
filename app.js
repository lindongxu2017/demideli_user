//app.js
var main = require('./utils/main.js');
var api = require('./utils/api.js');
// console.log(util)
App({
  scoket: '',
  myFn: main.myFn,
  api: api.api,
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.setStorageSync('mini_code', res.code)
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.getInfoAndLogin()
        } else {
          this.getInfoAndLogin()
        }
        this.message_scoket()
      }
    })
  },
  getInfoAndLogin() {
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo
        wx.setStorageSync('userinfo', res.userInfo)
        var data = {
          code: wx.getStorageSync('mini_code'),
          rawData: res.rawData,
          signature: res.signature,
          encryptedData: res.encryptedData,
          iv: res.iv
        }
        this.myFn.ajax('post', data, this.api.admin.login, res => {
          wx.setStorageSync('session3rd', res.data.session3rd)
          this.myFn.ajax('post', { 'session3rd': res.data.session3rd }, this.api.user.info, res => {
            wx.setStorageSync('appInfo', res.data)
            wx.setStorageSync('is_register', 1)
            wx.setStorageSync('is_auth', parseInt(res.data.is_auth))
          })
        })
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  message_scoket() {
    var self = this;
    this.scoket = wx.connectSocket({
      url: 'wss://service.qinhantangtop.com:9503',
      data: {
        rd_session: wx.getStorageSync('session3rd'),
        type: 'auth',
        user_id: 1,
        data: '123'
      },
      header: {
        'content-type': 'application/json'
      }
    })
    wx.onSocketOpen(res => {
      console.log('WebSocket连接已打开！')
      wx.sendSocketMessage({
        data: JSON.stringify({
          type: 'auth',
          user_id: wx.getStorageSync('appInfo').id,
          user_type: 1
        })
      })
    })
    wx.onSocketClose(function (res) {
      self.message_scoket()
      console.log('WebSocket 已关闭！')
    })
    wx.onSocketError(function (res) {
      self.message_scoket()
      console.log('WebSocket连接打开失败，请检查！')
    })
  },
  success_scoket(fn) {
    wx.onSocketMessage(res => {
      var res = JSON.parse(res.data);
      if (res.code == 200) {
        fn(res)
      }
    })
  },
  send_scoket(data) {
    wx.sendSocketMessage({
      data: JSON.stringify(data)
    })
  }
})