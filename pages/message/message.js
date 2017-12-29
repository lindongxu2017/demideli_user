// pages/message/message.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513656878371&di=610b76e559cbdc5104b76a2e0f1cf14e&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F562c11dfa9ec8a1348a3970bfd03918fa1ecc0a4.jpg',
    list: ['1','2','3','4'],
    bool: false
  },
  router (options) {
    var self = this;
    var params = options.target.dataset.value || options.currentTarget.dataset.value;
    console.log(params)
    if (!self.data.bool) {
      wx.navigateTo({
        url: './room/room?id=' + params,
        success: function () {
          self.setData({ bool: true })
          setTimeout(() => {
            self.setData({ bool: false })
          }, 1000)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      app.scoket.send({
          data: JSON.stringify({
              type: 'get_single_user_list',
              page: 1
          })
      })
      app.scoket.onMessage(res=>{
          console.log(res);
      })
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