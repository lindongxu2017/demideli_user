//index.js
//获取应用实例
const app = getApp()
const myFn = app.myFn
const api = app.api
// console.log(myFn)
Page({
  data: {
    showType: [],
    // 阻塞多次点击跳转
    bool: false
  },
  typeSearch(e) {
    var self = this;
    var id = e.target.dataset.id || e.currentTarget.dataset.id
    if (!self.data.bool) {
      wx.navigateTo({
        url: '/pages/index/list/list?id=' + id + 'status=-1',
        success: function () {
          self.setData({ bool: true })
          setTimeout(() => {
            self.setData({ bool: false })
          }, 1000)
        }
      })
    }
  },
  onLoad: function (options) {
    myFn.ajax('get', {}, api.home.typeList, res => {
      this.setData({ showType: res.data })
    })
    var timer = setInterval(res => {
      if (!wx.getStorageSync('session3rd')) return false;
        if (options.scene) {
          var scene = decodeURIComponent(options.scene)
          myFn.ajax('post', {
            session3rd: wx.getStorageSync('session3rd'),
            uid: scene.split(',')[0], type: scene.split(',')[1]
          }, api.user.setDown, res => {
            // todo
          })
        }
        clearInterval(timer)
    }, 200)
  },
  onShow() {
    
  }
})
