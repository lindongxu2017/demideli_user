//app.js
var main = require('./utils/main.js');
var api = require('./utils/api.js');
// console.log(util)
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res)
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
      }
    })
  },
  getInfoAndLogin () {
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo
        wx.setStorageSync('userinfo', res.userInfo)
        // console.log(res)
        var data = {
          code: wx.getStorageSync('mini_code'),
          rawData: res.rawData,
          signature: res.signature,
          encryptedData: res.encryptedData,
          iv: res.iv
        }
        this.myFn.ajax('post', data, this.api.admin.login, res => {
          console.log(res)
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
  myFn: main.myFn,
  api: api.api
})