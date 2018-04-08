//app.js
var main = require('./utils/main.js');
var api = require('./utils/api.js');
App({
    scoket: '',
    myFn: '',
    // api地址
    api: '',
    // 通信类型：1=用户，2=专员
    socket_type: 1,
    path: '',
    bool: false,
    onLaunch: function (e) {
        this.myFn = main.myFn
        this.api = api.api

        // var timer = setInterval(res => {
        //   if (wx.getStorageSync('userID')) {
        //     clearInterval(timer);
        //     this.message_scoket(wx.getStorageSync('userID'))
        //   }
        // }, 50)

        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                wx.setStorageSync('mini_code', res.code)

                // 获取用户信息
                wx.getUserInfo({
                    success: res => {
                        // 可以将 res 发送给后台解码出 unionId
                        console.log(res)
                        // 获取用户信息
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
                            wx.setStorageSync('islogin', true)
                            console.log(res)
                            this.getInfo(res.data.session3rd)
                        })
                        
                        if (this.userInfoReadyCallback) {
                            this.userInfoReadyCallback(res)
                        }
                    }
                })
            }
        })
    },
    onHide () {
      wx.closeSocket();
    },
    getInfo(session3rd) {
      this.myFn.ajax('post', { session3rd: session3rd }, this.api.user.info, res => {
            wx.setStorageSync('userID', res.data.id)
            wx.setStorageSync('appInfo', res.data)
            this.message_scoket(res.data.id)
        })
    },
    globalData: {
        userInfo: null
    },
    message_scoket(id) {
      var user_id = id
      var self = this
      wx.connectSocket({
        url: 'wss://service.qinhantangtop.com/wss',
        header: {
            'content-type': 'application/json'
        },
        fail(res) {
            console.log(res)
        },
        success(res) {
            // Todo
        }
      })
      wx.onSocketOpen(function (res) {
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
    },
    success_scoket(fn) {
        wx.onSocketMessage(res => {
            var res = JSON.parse(res.data);
            if (res.code == 200) {
                if (fn != null) {
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