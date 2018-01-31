// pages/center/card/edit/info/info.js
const app = getApp()
const myFn = app.myFn
const api = app.api
Page({
  data: {
    name: '',
    phone: '',
    tname: '',
    desc: '',
    imgArr: [],
    pathArr: [],
    headImgArr: [],
    headPathArr: [],
    session3rd: '',
    type: ''
  },
  onLoad: function (options) {
    this.setData({
      session3rd: wx.getStorageSync('session3rd'),
      name: wx.getStorageSync('cardInfo').name || '',
      phone: wx.getStorageSync('cardInfo').mobile || '',
      tname: wx.getStorageSync('cardInfo').industry_name || '',
      desc: wx.getStorageSync('cardInfo').industry_intro || '',
      imgArr: wx.getStorageSync('cardInfo').qrcode || [],
      pathArr: wx.getStorageSync('cardInfo').qrcode || [],
      headImgArr: wx.getStorageSync('cardInfo').headimgurl || [],
      headPathArr: wx.getStorageSync('cardInfo').headimgurl || []
    })
  },
  inputValue(e) {
    var key = e.target.dataset.key || e.currentTarget.dataset.key
    this.setData({ [key]: e.detail.value })
  },
  chooseIMG: function (e) {
    var self = this
    var index = e.target.dataset.index
    var type = e.target.dataset.type
    console.log(type)
    self.setData({ type})
    // var length = 9 - self.data.imgArr.length
    // var count = typeof index != 'undefined' ? 1 : length
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // var tempFilePaths = res.tempFilePaths
        if (typeof index != 'undefined') {
          if (type == 1) {
            self.data.headImgArr.splice(index, 1, res.tempFilePaths[0])
            self.setData({ headImgArr: self.data.headImgArr })
          } else {
            self.data.imgArr.splice(index, 1, res.tempFilePaths[0])
            self.setData({ imgArr: self.data.imgArr })
          }
        } else {
          if (type == 1) {
            self.setData({ headImgArr: self.data.headImgArr.concat(res.tempFilePaths) })
          } else {
            self.setData({ imgArr: self.data.imgArr.concat(res.tempFilePaths) })
          }
        }
        self.uploadIMG(index, res.tempFilePaths)
      }
    })
  },
  uploadIMG(index, fliePaths) {
    var path = '';
    path = fliePaths.shift();
    // console.log('上传路径' + path)
    wx.uploadFile({
      url: 'https://service.qinhantangtop.com/api/upload/NormalUploadImg',
      name: 'flie',
      filePath: path,
      header: { "content-type": 'multipart/form-data' },
      success: res => {
        if (typeof index != 'undefined') {
          if (this.data.type == 1) {
            this.data.headPathArr.splice(index, 1, JSON.parse(res.data).data.path)
            this.setData({ headPathArr: this.data.headPathArr })
          } else {
            this.data.pathArr.splice(index, 1, JSON.parse(res.data).data.path)
            this.setData({ pathArr: this.data.pathArr })
          }
        } else {
          if (this.data.type == 1) {
            this.data.headPathArr.push(JSON.parse(res.data).data.path)
            this.setData({ headPathArr: this.data.headPathArr })
          } else {
            this.data.pathArr.push(JSON.parse(res.data).data.path)
            this.setData({ pathArr: this.data.pathArr })
          }
        }
        if (fliePaths.length) {
          this.uploadIMG(index, fliePaths)
        }
        // console.log(this.data.pathArr)
      },
      fail: res => {
        // console.log(res)
      }
    })
  },
  delIMG(e) {
    var index = e.currentTarget.dataset.index
    var type = e.currentTarget.dataset.type
    var imgArr = this.data.imgArr
    var pathArr = this.data.pathArr
    var headImgArr = this.data.headImgArr
    var headPathArr = this.data.headPathArr
    if (type == 1) {
      headImgArr.splice(index, 1)
      headPathArr.splice(index, 1)
      this.setData({ headImgArr, headPathArr })
    } else {
      imgArr.splice(index, 1)
      pathArr.splice(index, 1)
      this.setData({ imgArr, pathArr })
    }
  },
  submit() {
    var data = {
      session3rd: this.data.session3rd,
      name: this.data.name,
      mobile: this.data.phone,
      industry_name: this.data.tname,
      industry_intro: this.data.desc,
    }
    if (this.data.pathArr[0]) {
      data.qrcode = this.data.pathArr[0]
    }
    if (this.data.headPathArr[0]) {
      data.headimgurl = this.data.headPathArr[0]
    }
    myFn.ajax('post', data, api.user.setCard, res => {
      wx.navigateBack()
    })
  }
})