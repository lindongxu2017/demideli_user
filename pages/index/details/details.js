// pages/service_details/service_details.js
const app = getApp()
const myFn = app.myFn
const api = app.api
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
    show: false,
    order_status: '',
    company_list: [],
    oid: ''
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
      if (res.data.length == 0) {
        this.setData({ company_list: [{ id: 0, corporate_name: '请先添加公司' }] })
        return false
      };
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i].status == 2) {
          arr.push(res.data[i])
        }
      }
      this.setData({ company_list: arr })
    })
  },
  bindPickerChange(e) {
    var id = this.data.company_list[e.detail.value].id
    this.order(id)
  },
  comment() {
    wx.navigateTo({
      url: './comment/comment?id=' + this.data.oid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    // e.id = 297
    if (e.status == -1) {
      this.setData({ show: true })
    } else {
      // this.setData({ order_status: parseInt(e.status) })
      this.setData({ order_status: 50 })
    }
    this.setData({ id: e.id })
    this.setData({ oid: e.oid })
    var data = {
      pid: e.id,
      session3rd: wx.getStorageSync('session3rd') || ''
    }
    // 获取详情
    myFn.ajax('get', data, api.home.itemDetail, res => {
      // console.log(res.data)
      WxParse.wxParse('article', 'html', res.data.content, this, 0);
      this.setData({ detail: res.data })
    })
    // 获取评价
    myFn.ajax('get', { pid: e.id, page: '1' }, api.home.comment, res => {
      // console.log(res)
      this.setData({ comment_list: res.data.data })
    })
    // 获取公司列表
    this.getCompanyList()
  }
})