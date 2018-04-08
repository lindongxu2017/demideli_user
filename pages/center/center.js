// pages/center/center.js
const app = getApp()
var myFn = app.myFn
var api = app.api
// console.log(myFn)
Page({
  data: {
    url: 'http://service.qinhantangtop.com/Uploads/icon/icon_',
    routerName: '',
    bool: false,
    is_register: '',
    is_auth: '',
    userinfo: {},
    company_list: []
  },
  routeTo(e) {
    var self = this
    var path = e.target.dataset.set || e.currentTarget.dataset.set
    var url = path + '/' + path
    if (path == 'auth') {
      if (this.data.is_register == 0) {
        url = '/pages/register/register'
      } else {
        url = path + '/' + path + '?type=1'
      }
    }

    if(path.split('-')[0] == 'order') {
      url = 'service/service?type=' + path.split('-')[1]
      console.log(url)
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
  get_company_list () {
    myFn.ajax('post', { session3rd: wx.getStorageSync('session3rd') }, api.user.companyList, res => {
      if(res.data.length > 0) {
        this.setData({ company_list: res.data })
        // console.log(res.data)
      }
    })
  },
  onLoad: function (options) {
    myFn = getApp().myFn
    api = getApp().api
    wx.setStorageSync('tab_path', 4)
    var timer = setInterval( res => {
      if (!wx.getStorageSync('appInfo')) return false;
      this.setData({ userinfo: wx.getStorageSync('appInfo') })
      this.get_company_list()
      clearInterval(timer)
    }, 200)
  },
  onShow () {
    
  }
})