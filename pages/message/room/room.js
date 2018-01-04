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
        details: {}
    },
    change(options) {
        this.setData({ sendMsg: options.detail.value })
    },
    send() {

        // 如果输入内容为空不发送
        if (!this.data.sendMsg) return false;

        app.send_scoket({
            type: 'send_single_message',
            message: this.data.sendMsg,
            user_id: this.data.uid
        })

    },
    onLoad: function (options) {

        this.setData({
            uid: options.uid
        })
        console.log(this.data.uid)
        var data = {
            pid: options.uid,
            session3rd: wx.getStorageSync('session3rd') || ''
        }

        if (options.serverid != undefined) {
            this.setData({
                serverid: options.serverid
            })

            myFn.ajax('get', data, api.home.itemDetail, res => {

                this.setData({
                    details: res.data
                })

                wx.setNavigationBarTitle({
                    title: this.data.details.name
                })

                var chatlist = this.data.list

            })
        }

        // 获取已读消息列表
        app.send_scoket({
            type: 'get_isread_single_message',
            user_id: this.data.uid
        })

        var chatlist = [];
        app.success_scoket(res=>{
            switch (res.type) {

                case 'send_single_message':

                    if (res.data.msg_type == 1) {
                        chatlist.push({ type: 1, content: res.data.message, name: res.data.nickname })
                    } else if (res.data.msg_type == 2) {
                        chatlist.push({ type: 2, content: res.data.message, name: res.data.receive_nickname })
                    }

                    this.setData({
                        list: chatlist,
                        sendMsg: '',
                        scrollTop: this.data.scrollTop + 80,
                        url: res.data.headimgurl,
                        receive_headimgurl: res.data.receive_headimgurl
                    })
                    break;

                case 'get_isread_single_message':
                    // 获取已读消息列表
                    app.send_scoket({
                        type: 'get_notread_single_message',
                        user_id: this.data.uid
                    })

                case 'get_notread_single_message':

                    for (var i = res.data.length-1; i >= 0; i--) {
                        if (res.data[i].msg_type == 1) {
                            chatlist.push({ type: 1, content: res.data[i].message, name: res.data[i].nickname })
                        } else if (res.data[i].msg_type == 2) {
                            chatlist.push({ type: 2, content: res.data[i].message, name: res.data[i].receive_nickname })
                        }
                    }
                    if (res.data.length != 0) {
                        this.setData({
                            list: chatlist,
                            url: res.data[0].headimgurl,
                            receive_headimgurl: res.data[0].receive_headimgurl,
                            // scrollTop: this.data.scrollTop + 80
                        })
                    }

                    break;
            }
        })
    }
})