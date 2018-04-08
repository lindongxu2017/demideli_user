// pages/service_details/service_details.js
const app = getApp()
var myFn = app.myFn
var api = app.api
const WxParse = require('../../../wxParse/wxParse.js');
// console.log(myFn)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'http://service.qinhantangtop.com/Uploads/icon/icon_',
    // service_list: [{ name: '代理记账', checked: false }, { name: '代理记账', checked: false }],
    select_value: 0,
    tabValue: 1,
    comment_list: [],
    detail: {},
    id: '',
    order_status: '',
    company_list: [],
    oid: '',
    cover: false
  },
  tabSwitch(options) {
    this.setData({ tabValue: options.target.dataset.tab });
  },
  select(options) {
    this.setData({ select_value: options.target.dataset.index })
  },
  collect() {
    myFn.ajax('post', { session3rd: wx.getStorageSync('session3rd'), pid: this.data.id }, api.home.collect, res => {
      this.data.detail.is_collect == 0 ? this.setData({ 'detail.is_collect': '1' }) : this.setData({ 'detail.is_collect': '0' })
    })
  },
  order(id) {
    myFn.ajax('post', { session3rd: wx.getStorageSync('session3rd'), pid: this.data.id, company_id: id }, api.order.creat, res => {
      // console.log('下单成功')
      myFn.popup(false, '恭喜您下单成功！', (res) => {
        wx.switchTab({
          url: '../../order/order'
        })
      })
    })
  },
  getCompanyList() {
    var arr = []
    myFn.ajax('post', { session3rd: wx.getStorageSync('session3rd') }, api.user.companyList, res => {
      if(res.data.length) {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].status == 2) {
            arr.push(res.data[i])
          }
        }
        this.setData({ company_list: arr })
      }
      // console.log(this.data.company_list)
    })
  },
  bindPickerChange(e) {
    // var id = this.data.company_list[e.detail.value].id
    var id = '';
    this.order(id)
  },
  comment() {
    wx.navigateTo({
      url: './comment/comment?id=' + this.data.oid,
    })
  },
  warm() {
    myFn.popup(true, '请先添加公司', res => {
      wx.navigateTo({
        url: '../../center/auth/auth',
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    myFn = getApp().myFn
    api = getApp().api
    this.setData({ id: e.id })
    this.setData({ oid: e.oid })
    if (e.type == 2) { this.setData({ cover: true }) }
    var data = {
      pid: e.id,
      session3rd: wx.getStorageSync('session3rd') || ''
    }
    // 获取详情
    myFn.ajax('get', data, api.home.itemDetail, res => {
      // console.log(res.data)
      WxParse.wxParse('article', 'html', res.data.content, this, 0);
      WxParse.wxParse('case', 'html', res.data.success_case, this, 0);
      this.setData({ detail: res.data })
    })
    // 获取评价
    myFn.ajax('get', { pid: e.id, page: '1' }, api.home.comment, res => {
      console.log(res, res.data.data.length)
      if(res.data.data.length > 0) {
        this.setData({ comment_list: res.data.data })
      } else {
        this.setData({ comment_list: [] })
      }
      // console.log(this.data.comment_list.length)
    })
    // 获取公司列表
    this.getCompanyList()
  },
  onShow () {
    
  },
  contact_server(e) {
    var uid = e.currentTarget.dataset.uid;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/message/room/room?id=' + id + '&uid=' + uid
    })
  },
  onShareAppMessage: function () {

  }
})