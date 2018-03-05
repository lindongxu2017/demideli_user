// pages/center/card/card.js
const app = getApp()
const myFn = app.myFn
const api = app.api
Page({
    data: {
        id: '',
        options_id: '',
        url: 'http://service.qinhantangtop.com/Uploads/icon/icon_',
        headImg: '',
        userInfo: '',
        animation: '',
        bool: false,
        popupVisible: false,
        cardInfo: {},
        myCardInfo: {},
        // true为他人名片
        DIY: false,
        lock: false
    },
    onLoad: function (options) {
        var TimeCallBack = setInterval ( res => {
            if (!!options.id || wx.getStorageSync('userID')) {

                clearInterval(TimeCallBack);
                // 获取用户信息
                if (wx.getStorageSync('appInfo')) {
                    this.data.userInfo = wx.getStorageSync('appInfo');
                    this.setData({ userInfo: this.data.userInfo })
                }

                // 获取个人名片信息,如果有id代表转发获取他人名片信息
                if (options.id) {
                    this.data.id = options.id;
                    this.setData({ DIY: true })
                } else {
                    this.data.id = wx.getStorageSync('userID');
                }
                myFn.ajax('post', { uid: this.data.id }, api.user.getCard, res => {
                    if (res.data == '') {
                        wx.navigateTo({
                            url: '/pages/center/card/edit/edit'
                        })
                    }
                    this.setData({ cardInfo: res.data })
                    wx.setStorageSync('cardInfo', res.data)
                })
            }
        }, 300)

        // 旋转动画设置
        var animation = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 1000,
            timingFunction: "ease",
            delay: 0
        })
        this.animation = animation;
        animation.rotate(315).step();
        this.setData({
            animationData: animation.export()
        })
    },
    // 加我微信弹出框
    popup() {
        this.setData({ popupVisible: !this.data.popupVisible })
    },
    // 预览图片
    previewImage() {
        var arr = []
        arr[0] = this.data.cardInfo.qrcode[0] || this.data.headImg
        wx.previewImage({
            current: this.data.cardInfo.qrcode[0] || this.data.headImg, // 当前显示图片的http链接
            urls: arr // 需要预览的图片http链接列表
        })
    },
    // 意见拨号
    callPhone() {
        wx.makePhoneCall({
            phoneNumber: this.data.userInfo.name || this.data.cardInfo.mobile
        })
    },
    routeTo(e) {
        var self = this
        var path = e.target.dataset.set || e.currentTarget.dataset.set

        // console.log(wx.getStorageSync('islogin'))
        // if (wx.getStorageSync('userID') != '') {
        //     myFn.ajax('post', { uid: wx.getStorageSync('userID') }, api.user.getCard, res => {
        //         this.setData({ myCardInfo: res.data })
        //         wx.setStorageSync('myCardInfo', res.data)
        //     })
        // }

        var pages = getCurrentPages()    //获取加载的页面
        var currentPage = pages[pages.length - 1]
        if (currentPage.options.id) {
            console.log(currentPage.options.id)
            myFn.ajax('post', { uid: currentPage.options.id }, api.user.getCard, res => {
                this.setData({ cardInfo: res.data })
                wx.setStorageSync('cardInfo', res.data)
            })
        }

        if (path == 'edit' && wx.getStorageSync('islogin')=='') {
            wx.navigateTo({
                url: '/pages/register/register?type=goCard'
            })
            return false;
        }

        myFn.ajax('post', { uid: this.data.id }, api.user.getCard, res => {
            if (res.data != '' && this.data.id != wx.getStorageSync('userID') && path == 'edit') {
                wx.navigateTo({
                    url: '/pages/center/card/card'
                })
                
            } else {

                var url = path + '/' + path
                if (!self.data.bool) {
                    wx.navigateTo({
                        url: url + '?id=' + this.data.id,
                        success: function () {
                            self.data.bool = true
                            setTimeout(() => {
                                self.data.bool = false
                            }, 1000)
                        }
                    })
                }
            }
        })
    },
    // 分享
    onShareAppMessage() {
        return {
            title: '得米得利',
            path: '/pages/center/card/card?id=' + this.data.id,
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})