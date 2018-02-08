// pages/center/card/edit/edit.js
const app = getApp()
const myFn = app.myFn
const api = app.api
Page({
  data: {
    url: 'http://service.qinhantangtop.com/Uploads/icon/icon_',
    name: '',
    phone: '',
    tname: '',
    desc: '',
    imgArr: [],
    pathArr: [],
    headImgArr: [],
    headPathArr: [],
    session3rd: '',
    companyName: '',
    companyDesc: '',
    companyAddress: '',
    cooperationImgArr: [],
    cooperationPathArr: [],
    constellation: '',
    bloodtype: '',
    hobby: '',
    selfevaluation: '',
    recommend: '',
    type: '',
    id: ''
  },
  onLoad: function (options) {
      myFn.ajax('post', { uid: wx.getStorageSync('userID') }, api.user.getCard, res => {
          this.setData({
                id: wx.getStorageSync('userID'),
                name: res.data.name || '',
                phone: res.data.mobile || '',
                tname: res.data.industry_name || '',
                imgArr: res.data.qrcode || [],
                pathArr: res.data.qrcode || [],
                headImgArr: res.data.headimgurl || [],
                headPathArr: res.data.headimgurl || [],
                companyName: res.data.company_name,
                companyDesc: res.data.company_intro,
                companyAddress: res.data.company_address,
                cooperationImgArr: res.data.customer_file || [],
                cooperationPathArr: res.data.customer_file || [],
                recommend: res.data.recomme_intro,
                constellation: res.data.constellation,
                bloodtype: res.data.bloodtype,
                hobby: res.data.hobby,
                selfevaluation: res.data.selfevaluation
          })
          console.log(res)
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
    self.setData({ type })
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
          } else if (type == 3) {
            self.data.cooperationImgArr.splice(index, 1, res.tempFilePaths[0])
            self.setData({ cooperationImgArr: self.data.cooperationImgArr })
          } else {
            self.data.imgArr.splice(index, 1, res.tempFilePaths[0])
            self.setData({ imgArr: self.data.imgArr })
          }
        } else {
          if (type == 1) {
            self.setData({ headImgArr: self.data.headImgArr.concat(res.tempFilePaths) })
          } else if (type == 3) {
            self.setData({ cooperationImgArr: self.data.cooperationImgArr.concat(res.tempFilePaths) })
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
          } else if (this.data.type == 3) {
            this.data.cooperationPathArr.splice(index, 1, JSON.parse(res.data).data.path)
            this.setData({ cooperationPathArr: this.data.cooperationPathArr })
          } else {
            this.data.pathArr.splice(index, 1, JSON.parse(res.data).data.path)
            this.setData({ pathArr: this.data.pathArr })
          }
        } else {
          if (this.data.type == 1) {
            this.data.headPathArr.push(JSON.parse(res.data).data.path)
            this.setData({ headPathArr: this.data.headPathArr })
          } else if (this.data.type == 3) {
            this.data.cooperationPathArr.push(JSON.parse(res.data).data.path)
            this.setData({ cooperationPathArr: this.data.cooperationPathArr })
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
    var cooperationImgArr = this.data.cooperationImgArr
    var cooperationPathArr = this.data.cooperationPathArr
    if (type == 1) {
      headImgArr.splice(index, 1)
      headPathArr.splice(index, 1)
      this.setData({ headImgArr, headPathArr })
    } else if (type == 3) {
      cooperationImgArr.splice(index, 1)
      cooperationPathArr.splice(index, 1)
      this.setData({ cooperationImgArr, cooperationPathArr })
    } else {
      imgArr.splice(index, 1)
      pathArr.splice(index, 1)
      this.setData({ imgArr, pathArr })
    }
  },
    submit() {
        var data = {
            session3rd: wx.getStorageSync('session3rd'),
            name: this.data.name || '',
            mobile: this.data.phone || '',
            industry_name: this.data.tname || '',
            company_name: this.data.companyName || '',
            company_intro: this.data.companyDesc || '',
            company_address: this.data.companyAddress || '',
            recomme_intro: this.data.recommend || '',
            constellation: this.data.constellation || '',
            bloodtype: this.data.bloodtype || '',
            hobby: this.data.hobby || '',
            selfevaluation: this.data.selfevaluation || ''
        }

        data.qrcode = this.data.pathArr[0] || []
        data.headimgurl = this.data.headPathArr[0] || []
        if (this.data.cooperationPathArr.length) {
            data.customer_file = this.data.cooperationPathArr.join(',')
        } else {
            data.customer_file = []
        }
        myFn.ajax('post', data, api.user.setCard, res => {
            // myFn.ajax('post', { uid: this.data.id }, api.user.getCard, res => {
                wx.setStorageSync('cardInfo', res.data)
                wx.navigateTo({
                    url: '/pages/center/card/card'
                })
            // })
        })
    }
  // routeTo(e) {
  //   var self = this
  //   var path = e.target.dataset.set || e.currentTarget.dataset.set
  //   var url = path + '/' + path
  //   if (!self.data.bool) {
  //     wx.navigateTo({
  //       url: url,
  //       success: function () {
  //         self.data.bool = true
  //         setTimeout(() => {
  //           self.data.bool = false
  //         }, 1000)
  //       }
  //     })
  //   }
  // }
})