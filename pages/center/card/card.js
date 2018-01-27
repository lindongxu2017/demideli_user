// pages/center/card/card.js
const app = getApp()
const myFn = app.myFn
const api = app.api
Page({
    data: {
        headImg: '',
        userInfo: '',
        animation: ''
    },
    onLoad: function (options) {
        myFn.ajax('post', { session3rd: wx.getStorageSync('session3rd') }, api.user.wxQRcode, res => {
            this.setData({ headImg: res.data.acode, userInfo: wx.getStorageSync('appInfo')})
        })

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
    callPhone () {
        wx.makePhoneCall({
            phoneNumber: '12345678900'
        })  
    }
})