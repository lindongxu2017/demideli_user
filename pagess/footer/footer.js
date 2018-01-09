// pages/footer/footer.js
Component({

  behaviors: [],

  properties: {
    footer: { // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal) { } // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
    }
  },
  data: {
    route_type: ''
  }, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {
    this.setData({ route_type: wx.getStorageSync('tab_path') || 1})
  },
  moved: function () { },
  detached: function () { },

  methods: {
    route(e) {
      console.log('初始值：' + this.data.route_type)
      var url = '';
      var type = e.currentTarget.dataset.path
      switch (parseInt(type)) {
        case 1: url = '../index/index'; break;
        case 2: url = '../order/order'; break;
        case 3: url = '../message/message'; break;
        case 4: url = '../center/center'; break;
      }
      if (type != this.data.route_type) {
        wx.redirectTo({
          url: url,
        })
      }
      wx.setStorageSync('tab_path', type)
      console.log(type)
    }
  }
})