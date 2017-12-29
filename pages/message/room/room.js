// pages/message/room/room.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513656878371&di=610b76e559cbdc5104b76a2e0f1cf14e&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F562c11dfa9ec8a1348a3970bfd03918fa1ecc0a4.jpg',
    id: '',
    list: [
      { type: 1, content: '断剑重铸之日，骑士归来之时', name: '放逐之刃' },
      { type: 2, content: '没错，最强的武器就是补丁', name: '武器大师' },
      { type: 1, content: '我应该早一点给我的剑买保险的', name: '放逐之刃' },
    ],
    sendMsg: '',
    scrollTop: 100
  },
  change(options) {
    this.setData({ sendMsg: options.detail.value })
  },
  send(options) {
    console.log(options)
    if (!this.data.sendMsg) return false;
    // console.log(this.data.sendMsg)
    var chatlist = this.data.list
    chatlist.push({ type: 2, content: this.data.sendMsg, name: '武器大师' })
    this.setData({ list: chatlist })
    this.setData({ sendMsg: '' })
    this.setData({ scrollTop: this.data.scrollTop + 80 })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id)
    this.data.id = options.id;
    wx.setNavigationBarTitle({
      title: this.data.id || 'test',
      success: function (res) {
        // success
      }
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