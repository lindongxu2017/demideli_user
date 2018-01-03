// pages/order/todo/todo.js
const app = getApp()
const myFn = app.myFn
const api = app.api
// console.log(myFn)
Page({
  data: {
    value: '',
    type: '',
    id: '',
    detail: {}
  },
  bindTextArea(e) {
    this.setData({ value: e.detail.value })
  },
  submit() {
    var tips = ''
    var url = ''
    var data = {
      order_id: this.data.id,
      content: this.data.value,
      session3rd: wx.getStorageSync('session3rd')
    }
    switch (parseInt(this.data.type)) {
      case 1: url = api.order.right; tips = '申请成功，我们将在24小时内将处理结果告知您！'; break;
      case 2: url = api.order.comment; tips = '评价成功！'; break;
    }
    if (!this.data.value) {
      myFn.popup(false, '内容不能为空', null)
      return false
    }
    myFn.ajax('post', data, url, res => {
      myFn.popup(false, tips, () => { wx.navigateBack() })
    })
  },
  onLoad: function (options) {
    var title = '';
    switch (parseInt(options.type)) {
      case 1: title = '订单维权'; break;
      case 2: title = '服务评价'; break;
    }
    wx.setNavigationBarTitle({ title: title })
    this.setData({ type: options.type, id: options.id })
    // 获取详情
    myFn.ajax('get', { pid: options.pid, session3rd: wx.getStorageSync('session3rd') }, api.home.itemDetail, res => {
      this.setData({ detail: res.data })
    })
  },
  onShow: function () {

  }
})