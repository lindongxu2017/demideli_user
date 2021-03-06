const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const statusCode = (res, sucFn) => {
  switch (parseInt(res.data.code)) {
    case 200:
      sucFn(res.data);
      break;
    // 未注册
    case 99997:
        // wx.setStorageSync('session3rd', res.data.data.session3rd)
        console.log(getCurrentPages()[0])
        if (getCurrentPages()[0].route != 'pages/center/card/card') {
            wx.navigateTo({
                url: '/pages/register/register'
            })
        }

        if (getCurrentPages()[0].data.id == '') {
            wx.navigateTo({
                url: '/pages/register/register?type=goCard'
            })
        }

        wx.setStorageSync('is_register', 0)
        wx.setStorageSync('appInfo', wx.getStorageSync('userinfo'))

        console.log(res.data)

        break;
    case 99999:
      console.log(res.data)
      break;
    case 10000:
      myFn.popup(false, res.data.msg)
      wx.hideLoading();
      break;
    default:
      myFn.popup(false, res.data.msg)
      break;
  }
}
// 公共方法
const myFn = {
  ajax(type, data, url, callback) {
    data = data || {}
    callback = callback || function () {}
    wx.request({
      url: 'https://service.qinhantangtop.com' + url,
      method: type,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        statusCode(res, callback);
      },
      fail(e) {
        callback(e);
      }
    })
  },
  popup (type, content, callback) {
    wx.showModal({
      title: '提示',
      content: content,
      showCancel: type,
      success: function (res) {
        if (res.confirm && callback) {
          callback()
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  }
}


module.exports = {
  formatTime: formatTime,
  myFn: myFn
}
