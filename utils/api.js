const api = {
  admin: {
    login: '/api/login/wxxcxlogin',
    register: '/api/login/userRegister',
    auth: '/api/login/userCompanyAuth'
  },
  user: {
    info: '/api/user/getUserInfo',
    companyList: '/api/user/userCompanyList',
    modify: '/api/user/modifyMobile',
    QRcode: '/api/user/wxGetAcode',
    setDown: '/api/user/setUserDown',
    suggest: '/api/user/sendSuggest',
    accountLog: '/api/user/userCostLogList',
    collection: '/api/user/collectList',
    wxQRcode: '/api/user/wxGetAcode',
    setDown: '/api/user/setUserDown',
    dowmlist: '/api/user/getDownList',
    setCard: '/api/user/setUserCards',
    getCard: '/api/user/getUserCards'
  },
  common: {
    getMobileCode: '/api/login/GetMobileCode',
    uploadIMG: '/api/upload/NormalUploadImg'
  },
  home: {
    typeList: '/api/product/getCategory',
    itemList: '/api/product/getProductList',
    itemDetail: '/api/product/productInfo',
    comment: '/api/product/getProductDp',
    collect: '/api/product/collect'
  },
  order: {
    list: '/api/order/getOrderList',
    detail: '/api/order/getOrderDetail',
    comment: '/api/order/addComment',
    right: '/api/order/backApply',
    cancleRight: '/api/order/cancelBack',
    creat: '/api/payment/makeOrder'
  },
  pay: {
    wxPay: '/api/wxpay/wxpay',
    offline: '/api/order/payByOther'
  },
  system: {
    info: '/api/index/getProgram',
    notice: '/api/index/notice'
  }
}

module.exports = {
  api: api
}