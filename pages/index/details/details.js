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
    imgUrls: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513656878371&di=610b76e559cbdc5104b76a2e0f1cf14e&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F562c11dfa9ec8a1348a3970bfd03918fa1ecc0a4.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513656878371&di=610b76e559cbdc5104b76a2e0f1cf14e&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F562c11dfa9ec8a1348a3970bfd03918fa1ecc0a4.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513656878371&di=610b76e559cbdc5104b76a2e0f1cf14e&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F562c11dfa9ec8a1348a3970bfd03918fa1ecc0a4.jpg',
    ],
    // service_list: [{ name: '代理记账', checked: false }, { name: '代理记账', checked: false }],
    select_value: 0,
    tabValue: 1,
    comment_list: [],
    detail: {},
    id: '',
    show: true,
    order_type: '',
    company_list: []
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
      console.log('下单成功')
      myFn.popup(false, '恭喜您下单成功！', (res) => {
        wx.switchTab({
          url: '../../order/order'
        })
      })
    })
  },
  getCompanyList() {
    myFn.ajax('post', { session3rd: wx.getStorageSync('session3rd') }, api.user.companyList, res => {
      if (res.data.length == 0) {
        this.setData({ company_list: [{ id: 0, corporate_name: '请选择您需要服务的公司'}] })
        return false
      };
      this.setData({ company_list: res.data })
    })
  },
  bindPickerChange(e) {
    var id = this.data.company_list[e.detail.value].id
    this.order(id)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    // e.id = 297
    if (e.status == 0) { this.setData({ show: false }) }
    this.setData({ id: e.id })
    var data = {
      pid: e.id,
      session3rd: wx.getStorageSync('session3rd') || ''
    }
    // 获取详情
    myFn.ajax('get', data, api.home.itemDetail, res => {
      console.log(res.data)
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
  },
    contact_server (e) {
        var uid = e.currentTarget.dataset.uid;
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/message/room/room?id=' + id + '&uid=' + uid
        })
    }
})