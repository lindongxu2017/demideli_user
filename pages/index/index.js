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
        url: '/pages/index/list/list?id=' + id,
        success: function () {
          self.setData({ bool: true })
          setTimeout(() => {
            self.setData({ bool: false })
          }, 1000)
        }
      })
    }
  },
  onLoad: function () {

  },
  onShow() {
    myFn.ajax('get', {}, api.home.typeList, res => {
      this.setData({ showType: res.data })
    })
  }
})
