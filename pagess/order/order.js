// pages/order/order.js
const app = getApp()
const myFn = app.myFn
const api = app.api
// console.log(myFn)
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    screen_list: [
      { type: 1, typeMsg: '待付款' },
      { type: 2, typeMsg: '待付款' },
      { type: 3, typeMsg: '服务中' },
      { type: 4, typeMsg: '待评价' }
    ],
    searchData: {
      session3rd: wx.getStorageSync('session3rd'),
      orderSta: '5',
      order_sn: ''
    },
    search_log1: [],
    search_result: [],
    tabValue: 1,
    screen_select: 0,
    popupValue: false,
    bool: false,
    cancel_btn: false,
    is_search: false
  },
  // 搜索框聚焦事件
  focus() {
    this.setData({
      cancel_btn: true,
      is_search: true
    })
  },
  // 取消按钮事件
  order_search() {
    this.setData({
      cancel_btn: false,
      'searchData.order_sn': ''
    })
    // 清空搜索结果
    this.setData({ search_result: '' })
  },
  // 搜索框按键事件
  keyup(e) {
    this.setData({ 'searchData.order_sn': e.detail.value })
  },
  search() {
    this.data.search_log1.unshift({ content: this.data.searchData.order_sn })
    this.setData({ search_log1: this.data.search_log1 })
    wx.setStorageSync('search_log1', this.data.search_log1)
    var data = this.data.searchData
    // data.orderSta = ''
    myFn.ajax('post', data, api.order.list, res => {
      this.setData({
        search_result: res.data,
        is_search: false
      })
    })
  },
  del_log(e) {
    var index = e.target.dataset.index
    var arr = this.data.search_log1
    arr.splice(index, 1)
    this.setData({ search_log1: arr })
    wx.setStorageSync('search_log1', arr)
  },
  log_search(e) {
    var index = e.target.dataset.index || e.currentTarget.dataset.index
    this.setData({ 'searchData.order_sn': this.data.search_log1[index].content })
    var data = this.data.searchData
    // data.orderSta = ''
    myFn.ajax('post', data, api.order.list, res => {
      this.setData({
        search_result: res.data,
        is_search: false
      })
    })
  },
  // tab切换事件
  tabSwitch(e) {
    var type = e.currentTarget.dataset.tab || e.target.dataset.tab
    var status = ''
    this.setData({ tabValue: type })
    switch (parseInt(type)) {
      case 1:
        status = 5
        break
      case 2:
        status = 10
        break
      case 3:
        status = 30
        break
      case 4:
        status = 50
        break
    }
    this.setData({ 'searchData.orderSta': status })
    this.getlist()
  },
  // 获取列表
  getlist() {
    this.data.searchData.session3rd = wx.getStorageSync('session3rd')
    // console.log()
    myFn.ajax('post', this.data.searchData, api.order.list, res => {
      this.setData({
        list: res.data,
        'searchData.order_sn': ''
      })
    })
  },
  // 详情
  godetail(e) {
    // console.log(e)
    var self = this;
    var id = e.currentTarget.dataset.id || e.target.dataset.id;
    var status = e.currentTarget.dataset.status || e.target.dataset.status;
    var right = e.currentTarget.dataset.right || e.target.dataset.right;
    if (!self.data.bool) {
      self.setData({ bool: true })
      wx.navigateTo({
        url: '/pagess/orderDetail/orderDetail?id=' + id,
        success: function () {
          setTimeout(() => { self.setData({ bool: false }) }, 1000)
        }
      })
    }
    this.setData({
      search_result: '',
      cancel_btn: false
    })
  },
  onLoad: function () {
    this.getlist()
    this.setData({
      search_log1: wx.getStorageSync('search_log1') || [],
      cancel_btn: false
    })
  }
})