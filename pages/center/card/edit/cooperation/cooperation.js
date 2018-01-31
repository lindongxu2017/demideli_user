const app = getApp()
const myFn = app.myFn
const api = app.api
Page({
  data: {
    imgArr: [],
    pathArr: [],
    session3rd: ''
  },
  onLoad: function (options) {
    this.setData({
      session3rd: wx.getStorageSync('session3rd'),
      imgArr: wx.getStorageSync('cardInfo').customer_file || [],
      depathArrsc: wx.getStorageSync('cardInfo').customer_file || []
    })
  },
  chooseIMG: function (e) {
    var self = this
    var index = e.target.dataset.index
    var length = 9 - self.data.imgArr.length
    var count = typeof index != 'undefined' ? 1 : length
    wx.chooseImage({
      count: count, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // var tempFilePaths = res.tempFilePaths
        if (typeof index != 'undefined') {
          self.data.imgArr.splice(index, 1, res.tempFilePaths[0])
          self.setData({ imgArr: self.data.imgArr })
        } else {
          self.setData({ imgArr: self.data.imgArr.concat(res.tempFilePaths) })
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
        if (this.data.pathArr.length == 9) {
          this.data.pathArr.splice(index, 1, JSON.parse(res.data).data.path)
          this.setData({ 'pathArr': this.data.pathArr })
        } else {
          this.data.pathArr.push(JSON.parse(res.data).data.path)
          this.setData({ 'pathArr': this.data.pathArr })
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
    var imgArr = this.data.imgArr
    var pathArr = this.data.pathArr
    imgArr.splice(index, 1)
    pathArr.splice(index, 1)
    this.setData({ imgArr, pathArr })
  },
  submit() {
    myFn.ajax('post', {
      session3rd: this.data.session3rd,
      customer_file: this.data.pathArr.join(','),
    }, api.user.setCard, res => {
      wx.navigateBack()
    })
  }
})