//app.js

App({
    a: 1,
    scoket: '',
    myFn: '',
    // api地址
    api: '',
    // 通信类型：1=用户，2=专员
    socket_type: '',
    path: '',
    bool: false,
    onShow: function (options) {
        // 当前页面地址
        this.path = options.path;
        var main, api;
        if (this.path.split('/')[0] == 'pagess') {
          main = require('./utilss/main.js');
          api = require('./utilss/api.js');
          this.socket_type = 2

          this.a = 2;

        } else if (this.path.split('/')[0] == 'pages') {
          main = require('./utils/main.js');
          api = require('./utils/api.js');
          this.socket_type = 1

          this.a = 1;

        }
        this.myFn = main.myFn
        this.api = api.api

        // console.log(this.api, 'app.js')

        // if (options.path == 'pages/index/index' || options.path == 'pagess/index/index') {
        //     this.bool = true
        //     this.onLaunch(options)
        // }

        this.bool = true
        this.onLaunch(options)

        var timer = setInterval(res => {
          if (wx.getStorageSync('userID')) {
            clearInterval(timer);
            this.message_scoket(wx.getStorageSync('userID'))
          }
        }, 50)
    },
    onLaunch: function (e) {
        if (!this.bool) return false;
        this.bool = false;
        // console.log()
        // 登录
        // var main = require('./utilss/main.js');
        // var api = require('./utilss/api.js');
        // this.myFn = main.myFn
        // this.api = api.api
        // this.socket_type = 1
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

                // wx.getSetting({
                //     success: res => {
                //         if (res.authSetting['scope.userInfo']) {
                //             // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                //             this.getInfoAndLogin()
                //         }
                //         this.getInfoAndLogin()
                //     }
                // })
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