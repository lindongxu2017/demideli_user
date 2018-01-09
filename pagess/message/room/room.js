// pages/message/room/room.js
const app = getApp()
const myFn = app.myFn
const api = app.api
Page({
  data: {
    userInfo: {},
    url: '',
    receive_headimgurl: '',
    id: '',
    serverid: '',
    list: [],
    // input内容
    sendMsg: '',
    scrollTop: 100,
    // 订单详情
    details: {},
    bool: false,
    set_read: false,
    uid: ''
  },
  change(options) {
    this.setData({ sendMsg: options.detail.value })
  },
  send() {
    // 如果输入内容为空不发送
    console.log('发送内容：' + this.data.sendMsg)
    if (!this.data.sendMsg) return false;
    app.send_scoket({
      type: 'send_single_message',
      message: this.data.sendMsg,
      user_id: this.data.uid
    })
  },
  send_link() {
    app.send_scoket({
      type: 'send_product_info',
      pid: this.data.serverid,
      user_id: this.data.uid
    })
  },
  sendIMG(url) {
    app.send_scoket({
      type: 'send_img_message',
      imgUrl: url,
      user_id: this.data.uid
    })
  },
  chooseIMG() {
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // var tempFilePaths = res.tempFilePaths
        this.uploadFile(res.tempFilePaths)
      }
    })
  },
  uploadFile(fliePaths) {
    var path = fliePaths.shift()
    wx.uploadFile({
      url: 'http://service.qinhantangtop.com/index.php/api/upload/NormalUploadImg',
      filePath: path,
      name: 'file',
      header: { "content-type": 'multipart/form-data' },
      success: res => {
        // console.log(JSON.parse(res.data).data.path)
        this.sendIMG(JSON.parse(res.data).data.path)
        if (fliePaths.length) {
          this.uploadFile(fliePaths)
        }
      },
      fail: res => {
        console.log('网络错误')
      }
    })
  },
  scroll_bottom() {
    setTimeout(() => {
      this.setData({ scrollTop: 200 * this.data.list.length })
    }, 200)
  },
  goDetail(e) {
    if (!this.data.bool) {
      this.setData({ bool: true })
      var id = e.currentTarget.dataset.pid
      wx.navigateTo({
        url: '../../index/details/details?id=' + id + '&type=2',
      })
      setTimeout(() => { this.setData({ bool: false }) }, 200)
    }
  },
  close_link() {
    // console.log(11)
    this.setData({ is_close: true })
  },
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      uid: options.uid,
      serverid: options.id
    })
    // console.log(this.data.uid)
    var data = {
      pid: options.id,
      session3rd: wx.getStorageSync('session3rd') || ''
    }
    if (options.id != undefined) {
      myFn.ajax('get', data, api.home.itemDetail, res => {
        this.setData({ details: res.data })
        wx.setNavigationBarTitle({ title: this.data.details.name })
      })
    }

    // 获取已读消息列表
    app.send_scoket({
      type: 'get_isread_single_message',
      user_id: this.data.uid
    })

    var chatlist = [];
    app.success_scoket(res => {
      console.log('回调：' + JSON.stringify(res))
      switch (res.type) {
        case 'send_single_message':
          if (res.data.uid == this.data.uid) {
            this.setData({ set_read: true })
            app.send_scoket({
              type: 'get_notread_single_message',
              user_id: this.data.uid
            })
          }
          if (res.data.uid == this.data.uid || res.data.uid == wx.getStorageSync('userID')) {
            chatlist.push({
              show_type: res.data.show_type,
              type: res.data.msg_type,
              content: res.data.message,
              name: res.data.nickname,
              headimgurl: res.data.headimgurl
            })
          }
          this.setData({ list: chatlist, sendMsg: '' })
          this.scroll_bottom()
          break;
        case 'send_img_message':
          chatlist.push({
            type: res.data.msg_type,
            show_type: res.data.show_type,
            name: res.data.nickname,
            url: res.data.message,
            headimgurl: res.data.headimgurl
          })
          this.setData({ list: chatlist })
          this.scroll_bottom()
          break;
        case 'get_isread_single_message':
          // 获取已读消息列表
          app.send_scoket({
            type: 'get_notread_single_message',
            user_id: this.data.uid
          })
          res.data.reverse()
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].show_type == 2) {
              chatlist.push({
                type: res.data.msg_type,
                show_type: res.data[i].show_type,
                img: res.data[i].message.photo_x,
                name: res.data[i].message.name,
                price: res.data[i].message.price,
                pid: res.data[i].message.pid
              })
            } else if (res.data[i].show_type == 3) {
              chatlist.push({
                type: res.data[i].msg_type,
                show_type: res.data[i].show_type,
                name: res.data[i].nickname,
                url: res.data[i].message,
                headimgurl: res.data[i].headimgurl
              })
            } else {
              chatlist.push({
                show_type: res.data[i].show_type,
                type: res.data[i].msg_type,
                content: res.data[i].message,
                name: res.data[i].nickname,
                headimgurl: res.data[i].headimgurl
              })
            }
          }
          this.setData({ list: chatlist })
          this.scroll_bottom()
          break;

        case 'get_notread_single_message':
          if (this.data.set_read) return false;
          res.data.reverse()
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].show_type == 2) {
              chatlist.push({
                show_type: res.data[i].show_type,
                type: res.data[i].msg_type,
                img: res.data[i].message.photo_x,
                name: res.data[i].message.name,
                price: res.data[i].message.price,
                pid: res.data[i].message.pid
              })
            } else if (res.data[i].show_type == 3) {
              chatlist.push({
                type: res.data[i].msg_type,
                show_type: res.data[i].show_type,
                name: res.data[i].nickname,
                url: res.data[i].message,
                headimgurl: res.data[i].headimgurl
              })
            } else {
              chatlist.push({
                show_type: res.data[i].show_type,
                type: res.data[i].msg_type,
                content: res.data[i].message,
                name: res.data[i].nickname,
                headimgurl: res.data[i].headimgurl
              })
            }
          }
          this.setData({ list: chatlist })
          this.scroll_bottom()
          break;

        case 'send_product_info':
          chatlist.push({
            show_type: res.data.show_type,
            type: res.data.msg_type,
            img: res.data.message.photo_x,
            name: res.data.message.name,
            price: res.data.message.price,
            pid: res.data.message.pid
          })
          this.setData({ list: chatlist })
          this.scroll_bottom()
          break;
      }
    })
  }
})