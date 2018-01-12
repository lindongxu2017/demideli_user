//app.js

// console.log(util)
App({
  scoket: '',
  myFn: '',
  api: '',
  socket_type: '',
  onShow: function (e) {
    wx.clearStorageSync()
    console.log(e.path)
    if (e.path.split('/')[0] == 'pagess') {
      var main = require('./utilss/main.js');
      var api = require('./utilss/api.js');
      this.myFn = main.myFn
      this.api = api.api
      this.socket_type = 2
      // console.log(main, api)
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
            this.getInfoAndLogin2()
          } else {
            this.getInfoAndLogin2()
          }
        }
      })
    } else {
      var main = require('./utils/main.js');
      var api = require('./utils/api.js');
      this.myFn = main.myFn
      this.api = api.api
      this.socket_type = 1
      // console.log(main, api)
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
            this.getInfoAndLogin1()
          } else {
            this.getInfoAndLogin1()
          }
          // this.message_scoket()
        }
      })
    }
  },
  getInfoAndLogin1() {
    wx.getUserInfo({
      success: res => {
        console.log(res)
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
        //   console.log(res)
          wx.setStorageSync('session3rd', res.data.session3rd)
          this.myFn.ajax('post', { 'session3rd': res.data.session3rd }, this.api.user.info, res => {
            wx.setStorageSync('appInfo', res.data)
            wx.setStorageSync('is_register', 1)
            wx.setStorageSync('is_auth', parseInt(res.data.is_auth))
          })
          this.getInfo()
        })
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    })
  },
  getInfoAndLogin2() {
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo
        wx.setStorageSync('userinfo', res.userInfo)
        wx.setStorageSync('loginData', res)
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
        var data = {
          code: wx.getStorageSync('mini_code'),
          rawData: res.rawData,
          signature: res.signature,
          encryptedData: res.encryptedData,
          iv: res.iv
        }
        this.myFn.ajax('post', data, this.api.admin.login, res => {
          wx.setStorageSync('session3rd', res.data.session3rd)
          console.log(res)
          this.getInfo()
        })
      }
    })
  },
  getInfo() {
    this.myFn.ajax('post', { 'session3rd': wx.getStorageSync('session3rd') }, this.api.user.info, res => {
      this.message_scoket(res.data.id)
      wx.setStorageSync('userID', res.data.id)
    })
  },
  globalData: {
    userInfo: null
  },
  message_scoket(id) {
    var user_id = id || wx.getStorageSync('userID')
    var self = this;
    wx.connectSocket({
        url: 'wss://service.qinhantangtop.com/wss',
        header: {
            'content-type': 'application/json'
        },
        fail (res) {
            console.log(res)
        },
        success (res) {
            wx.onSocketOpen(res => {

                self.send_scoket({
                    type: 'auth',
                    user_id: user_id,
                    user_type: self.socket_type
                })
                
                setInterval(res => {
                    self.send_scoket({})
                }, 5000)
                
            })

            wx.onSocketClose(function (res) {
                console.log('WebSocket 已关闭！', new Date())
                wx.closeSocket({
                    success() {
                        self.message_scoket()
                    }
                })
            })
            wx.onSocketError(function (res) {
                console.log('WebSocket连接打开失败，请检查！')
            })
        }
    })
  },
  success_scoket(fn) {
    wx.onSocketMessage(res => {
      var res = JSON.parse(res.data);
      if (res.code == 200) {
        if(fn != null) {
          fn(res)
        }
      }
    })
  },
  send_scoket(data) {
    wx.sendSocketMessage({
      data: JSON.stringify(data)
    })
  }
})