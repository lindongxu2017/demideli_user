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
    tabValue: 1,
    list: [],
    screen_list: [
      { type: 1, typeMsg: '洽谈中' },
      { type: 2, typeMsg: '待付款' },
      { type: 3, typeMsg: '服务中' },
      { type: 4, typeMsg: '待评价' }
    ],
    screen_select: 0,
    popupValue: false,
    searchData: {
      session3rd: wx.getStorageSync('session3rd'),
      type: 7,
      page: 1,
      order_sn: '',
      start_time: '',
      end_time: ''
    },
    bool: false
  },
  // 搜索框按键事件
  keyup(e) {
    this.setData({ 'searchData.order_sn': e.detail.value })
    if (this.data.searchData.order_sn == '') {
      this.getlist()
    }
  },
  // 搜索按钮事件
  order_search() {
    if (this.data.searchData.order_sn == '') return false
    this.getlist()
  },
  // tab切换事件
  tabSwitch(e) {
    var type = e.currentTarget.dataset.tab || e.target.dataset.tab
    this.setData({ tabValue: type })
    type == 1 ? this.setData({ 'searchData.type': 7 }) : this.setData({ 'searchData.type': 5 })
    this.getlist()
  },
  // 打开筛选
  open_screen() { this.setData({ popupValue: !this.data.popupValue }) },
  // 关闭筛选
  close() {
    this.setData({ popupValue: false })
    this.setData({ screen_select: 0 })
  },
  // 选择状态事件
  select_screen(e) {
    var index = e.currentTarget.dataset.index || e.target.dataset.index
    this.setData({ screen_select: index })
    this.setData({ 'searchData.type': this.data.screen_list[index].type })
  },
  // 筛选时间事件
  bindDateChange: function (e) {
    console.log(e)
    var type = e.currentTarget.dataset.date || e.target.dataset.date
    switch (parseInt(type)) {
      case 1:
        this.setData({ 'searchData.start_time': e.detail.value })
        break;
      case 2:
        this.setData({ 'searchData.end_time': e.detail.value })
        break;
    }
  },
  // 筛选确定按钮事件
  screen() {
    this.getlist()
  },
  // 获取列表
  getlist() {
    this.setData({ 'searchData.session3rd': wx.getStorageSync('session3rd') })
    // console.log(this.data.searchData)
    myFn.ajax('post', this.data.searchData, api.order.list, res => {
      this.setData({ list: res.data.data })
      // 清空搜索条件
      // this.setData({ 'searchData.start_time': '' })
      // this.setData({ 'searchData.end_time': '' })
      // this.setData({ 'searchData.type': '' })
      this.close()
    })
  },
  // 详情
  godetail(e) {
    // console.log(e)
    var self = this;
    var id = e.currentTarget.dataset.id || e.target.dataset.id;
    var pid = e.currentTarget.dataset.pid || e.target.dataset.pid;
    var status = e.currentTarget.dataset.status || e.target.dataset.status;
    var right = e.currentTarget.dataset.right || e.target.dataset.right;
    // console.log(e.currentTarget.dataset)
    if (!self.data.bool) {
      self.setData({ bool: true })
      wx.navigateTo({
        url: '../orderDetail/orderDetail?id=' + id + '&status=' + status,
        success: function () {
          setTimeout(() => { self.setData({ bool: false }) }, 1000)
        }
      })
    }
  },
  // goPay 支付
  goPay(e) {
    var id = e.target.dataset.id
    wx.navigateTo({ url: '../pay/pay?id=' + id })
  },
  // goTodo 订单操作
  goTodo(e) {
    var id = e.target.dataset.id
    var pid = e.target.dataset.pid
    var type = e.target.dataset.type
    wx.navigateTo({ url: './todo/todo?id=' + id + '&pid=' + pid + '&type=' + type })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync('tab_path', 2)
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getlist()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})