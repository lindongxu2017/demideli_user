// pages/center/manage/manage.js
const app = getApp()
var myFn = app.myFn
var api = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'http://service.qinhantangtop.com/Uploads/icon/icon_',
    company_list: [],
    userinfo: {},
    is_register: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    myFn = getApp().myFn
    api = getApp().api
    this.setData({ userinfo: wx.getStorageSync('appInfo') })
    this.getCompanyList()
  },
  getCompanyList() {
    myFn.ajax('post', { session3rd: wx.getStorageSync('session3rd') }, api.user.companyList, res => {
      this.setData({ company_list: res.data })
    })
  },
  routeTo(e) {
    var self = this
    var path = e.target.dataset.routername || e.currentTarget.dataset.routername
    var id = e.target.dataset.id || e.currentTarget.dataset.id
    var url = path + '/' + path
    if (path == 'add') {
      if (this.data.userinfo.is_auth == 0) {
        url = '/pages/register/register'
      } else {
        url = '/pages/center/auth/auth?type=2'
      }
    }
    if (path == 'detail') {
      url = './detail/detail?id=' + id
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
  }
})