//index.js
//获取应用实例
const app = getApp()
var myFn = app.myFn
var api = app.api

// console.log(myFn)
Page({
  data: {
    showType: [],
    // 阻塞多次点击跳转
    bool: false,
    url: 'http://service.qinhantangtop.com/Uploads/icon/',
    activeID: '',
    animationData: {},
    animation: false,
    elementWidth: '',
    wrapperWidth: '',
    duration: '',
    init: false,
    homeBanner: [],
    notice: []
  },
  typeSearch(e) {
    var self = this;
    var id = e.target.dataset.id || e.currentTarget.dataset.id
    this.setData({activeID: id})
    this.getList(this.data.activeID)
  },
  onLoad: function (options) {
    // setTimeout(res => {
    //   wx.clearStorageSync()
    // }, 3000)
    myFn = getApp().myFn
    api = getApp().api
    myFn.ajax('get', {}, api.home.typeList, res => {
      this.setData({ showType: res.data, activeID: res.data[0].id })
      this.getList(this.data.activeID)
    })
    myFn.ajax('post', {}, api.system.info, res => {
      // console.log(res)
      this.setData({ homeBanner: res.data.banner })
    })
    myFn.ajax('post', {}, api.system.notice, res => {
      // console.log(res)
      this.setData({ notice: res.data })
      setTimeout(response => {
        this.getDom()
      }, 500)
    })
    // console.log(wx.getStorageSync('userID'))
    // wx.hideShareMenu();
  },
  getList(id) {
    myFn.ajax('get', { cid: id }, api.home.itemList, res => {
      this.setData({ list: res.data.data })
    })
  },
  go_details(e) {
    var id = e.target.dataset.id || e.currentTarget.dataset.id
    var self = this;
    if (!self.data.bool) {
      wx.navigateTo({
        url: '/pages/index/details/details?id=' + id,
        success: function () {
          self.setData({ bool: true })
          setTimeout(() => {
            self.setData({ bool: false })
          }, 1000)
        }
      })
    }
  },
  onShow() {
    
  },
  // 计算dom属性、动画时间
  getDom () {
    var query = wx.createSelectorQuery();
    query.select('#notice').boundingClientRect()
    query.exec(res => {
      this.data.elementWidth = res[0].width
      console.log(this.data.elementWidth)
    })
    var selecter = wx.createSelectorQuery();
    selecter.select('#notice-text').boundingClientRect()
    selecter.exec(res => {
      this.data.wrapperWidth = res[0].width
      if (this.data.elementWidth > this.data.wrapperWidth) {
        this.data.duration = (this.data.elementWidth / this.data.wrapperWidth) * 5000;
        this.translateX();
      }
    })
  },
  // 向左偏移动画
  translateX () {
    this.setData({ init: false })
    var animation = wx.createAnimation({
      duration: this.data.duration,
      timingFunction: 'linear',
    })
    this.animation = animation
    animation.left(-this.data.elementWidth).step()
    this.setData({
      animationData: animation.export()
    })
    setTimeout(res => {
      this.initAnimation()
    }, this.data.duration)
  },
  // 初始化动画
  initAnimation () {
    this.setData({ init: true })
    var animation = wx.createAnimation({
      duration: 0,
      timingFunction: 'linear',
    })
    this.animation = animation
    animation.left(this.data.wrapperWidth).step()
    this.setData({
      animationData: animation.export()
    })
    this.data.duration = ((this.data.elementWidth + this.data.wrapperWidth) / this.data.wrapperWidth) * 5000;
    this.translateX();
  },
  onShareAppMessage: function () {

  }
})
