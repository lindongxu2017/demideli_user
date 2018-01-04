// pages/center/auth/auth.js
const app = getApp()
const myFn = app.myFn
const api = app.api
// console.log(myFn)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'http://service.qinhantangtop.com/Uploads/icon/icon_',
    // 判断认证、添加
    type: '',
    items: [
      { name: '1', value: '请确认同意本平台服务协议' }
    ],
    // 预览路径
    img1: [],
    img2: [],
    img3: [],
    is_register: '0',
    protocol: '',
    company_name: '',
    company_charge: '',
    // upload 返回图片路径
    type_1: [],
    type_2: '',
    type_3: ''
  },
  chooseType(e) {
    var type = e.target.dataset.register || e.currentTarget.dataset.register
    this.setData({ is_register: type })
    // console.log(this.data.is_register)
  },
  checkboxChange(e) {
    e.detail.value[0] ? this.setData({ protocol: e.detail.value[0] }) : this.setData({ protocol: '' })
    // console.log(this.data.protocol)
  },
  inputValue(e) {
    var key = e.target.dataset.key || e.currentTarget.dataset.key
    this.setData({ [key]: e.detail.value })
    // console.log(this.data.key)
  },
  chooseIMG: function (e) {
    var self = this
    var type = e.target.dataset.type || e.currentTarget.dataset.type
    var index = e.target.dataset.index
    var count = typeof index != 'undefined' ? 1 : 3
    wx.chooseImage({
      count: count, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // var tempFilePaths = res.tempFilePaths
        if (type == 1) {
          if (typeof index != 'undefined') {
            self.data.img1.splice(index, 1, res.tempFilePaths[0])
            self.setData({ img1: self.data.img1 })
          } else {
            self.setData({ img1: self.data.img1.concat(res.tempFilePaths) })
          }
        } else if (type == 2) {
          self.setData({ img2: res.tempFilePaths })
        } else {
          self.setData({ img3: res.tempFilePaths })
        }
        self.uploadIMG(index, type, res.tempFilePaths)
      }
    })
  },
  uploadIMG(index, type, fliePaths) {
    var path = '';
    if (type == 1) {
      path = fliePaths.shift();
    } else {
      path = fliePaths[0]
    }
    console.log('上传路径' + path)
    wx.uploadFile({
      url: 'http://service.qinhantangtop.com/index.php/api/upload/NormalUploadImg',
      name: 'flie',
      filePath: path,
      header: { "content-type": 'multipart/form-data' },
      success: res => {
        if (type == 1) {
          if (this.data.type_1.length == 3) {
            this.data.type_1.splice(index, 1, JSON.parse(res.data).data.path)
            this.setData({ 'type_1': this.data.type_1 })
          } else {
            this.data.type_1.push(JSON.parse(res.data).data.path)
            this.setData({ 'type_1': this.data.type_1 })
          }
          if (fliePaths.length) {
            this.uploadIMG(index, type, fliePaths)
          }
        }
        if (type == 2 || type == 3) {
          var key = type == 2 ? 'type_2' : 'type_3'
          this.setData({ [key]: JSON.parse(res.data).data.path })
        }
        // console.log(this.data)
      },
      fail: res => {
        // console.log(res)
      }
    })
  },
  submit() {
    var data = {
      session3rd: wx.getStorageSync('session3rd'),
      company_name: this.data.company_name,
      corporate_name: this.data.company_charge,
      is_register: this.data.is_register,
      license_img: this.data.type_1.join(','),
      corporate_identity_img: this.data.type_2 + ',' + this.data.type_3
    }
    // console.log(data)
    // 表单验证
    if (!this.data.company_name) {
      myFn.popup(false, '公司名称不能为空', null)
      return false
    }
    if (!this.data.company_charge) {
      myFn.popup(false, '法人不能为空', null)
      return false
    }
    if (!this.data.type_1.length) {
      var content = ''
      this.data.is_register == 1 ? content = '请上传公司营业执照' : content = '请上传凭证'
      myFn.popup(false, content, null)
      return false
    }
    if (!this.data.type_2 || !this.data.type_3) {
      myFn.popup(false, '请上传完整的法人身份证照', null)
      return false
    }
    if (!this.data.protocol) {
      myFn.popup(false, '请确认服务协议', null)
      return false
    }
    myFn.ajax('post', data, api.admin.auth, res => {
      // console.log(res)
      wx.navigateBack()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var title = ''
    this.setData({ type: wx.getStorageSync('is_auth') })
    this.setData({ type: options.type })
    options.type == 1 ? title = '会员认证' : title = '添加名下企业'
    wx.setNavigationBarTitle({ title: title || '会员认证' })
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