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
    popupValue: false,
    searchData: {
      session3rd: wx.getStorageSync('session3rd'),
      orderSta: '5',
      order_sn: ''
    },
    bool: false,
    money: '',
    orderID: '',
    index: '',
    cancel_btn: false,
    is_search: false,
    search_log2: [],
    IO: false
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
      'searchData.order_sn': '',
    })
    this.getlist()
  },
  // 搜索框按键事件
  keyup(e) {
    this.setData({ 'searchData.order_sn': e.detail.value })
    // if() {}
  },
  search() {
    if (this.data.searchData.order_sn == '' ) return false;
    this.data.search_log2.unshift({ content: this.data.searchData.order_sn })
    this.setData({ search_log2: this.data.search_log2 })
    wx.setStorageSync('search_log2', this.data.search_log2)
    this.getlist()
  },
  del_log(e) {
    var index = e.target.dataset.index
    var arr = this.data.search_log2
    arr.splice(index, 1)
    this.setData({ search_log2: arr })
    wx.setStorageSync('search_log2', arr)
  },
  log_search(e) {
    var index = e.target.dataset.index || e.currentTarget.dataset.index
    this.setData({ 'searchData.order_sn': this.data.search_log2[index].content })
    this.getlist()
  },
  clear_log() {
    wx.setStorageSync('search_log2', '')
    this.setData({ search_log2: []})
  },
  // 获取列表
  getlist() {
    this.data.searchData.session3rd = wx.getStorageSync('session3rd')
    myFn.ajax('post', this.data.searchData, api.order.list, res => {
      this.setData({
        list: res.data,
        cancel_btn: false
      })
    })
  },
  change_price(e) {
    this.setData({ popupValue: true })
    this.setData({ orderID: e.target.dataset.id })
    this.setData({ index: e.target.dataset.index })
  },
  inputvalue(e) {
    this.setData({ money: e.detail.value })
  },
  cancel() {
    this.setData({ popupValue: false })
  },
  confirm() {
    myFn.ajax('post', { oid: this.data.orderID, session3rd: wx.getStorageSync('session3rd'), newPrice: this.data.money },
      api.order.change, res => {
        var key = 'list[' + this.data.index + '].amount'
        this.setData({ [key]: this.data.money })
        this.setData({ popupValue: false })
        this.setData({ money: '' })
      })
  },
  cooperation(e) {
    var self = this;
    // console.log(e.target.dataset.id)
    wx.showModal({
      title: '提示',
      content: '是否确认合作？',
      success: function (res) {
        if (res.confirm) {
          myFn.ajax('post', { oid: e.target.dataset.id, session3rd: wx.getStorageSync('session3rd') },
            api.order.cooperation, res => {
              myFn.popup(false, '合作成功！', (res) => {
                self.getlist()
              })
            })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  // 详情
  godetail(e) {
    console.log(e)
    var self = this;
    var id = e.currentTarget.dataset.id || e.target.dataset.id;
    if (!self.data.bool) {
      self.setData({ bool: true })
      wx.navigateTo({
        url: '/pagess/orderDetail/orderDetail?id=' + id,
        success: function () {
          setTimeout(() => { self.setData({ bool: false }) }, 1000)
        }
      })
    }
  },
  onLoad () {
    var timer = setInterval(res => {
      if (!this.data.IO && wx.getStorageSync('session3rd')) {
        this.getlist()
        this.setData({
          search_log2: wx.getStorageSync('search_log2') || [],
          cancel_btn: false
        })
        this.data.IO = true
        clearInterval(timer)
      }
    }, 100)
  }
})